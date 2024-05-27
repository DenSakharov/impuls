/* eslint-disable no-console */
require('dotenv').config();

const express = require("express");
const { MongoClient } = require("mongodb");
const SocketServer = require("ws").Server;
const uuid = require("uuid");
const _ = require("lodash");
const { applyOp } = require("./op");

const defaultData = {
  name: "Demo",
  id: uuid.v4(),
  celldata: [{ r: 0, c: 0, v: null }],
  order: 0,
  row: 84,
  column: 60,
  config: {},
  pivotTable: null,
  isPivotTable: false,
  status: 0,
  documentId:""
};

const dbName = process.env.DB_Mongo;
const collectionName = process.env.collectionName;
const uri = "mongodb://78.107.235.216:31000";
const client = new MongoClient(uri);
let presences = [];

async function initMongoDB() {
    
  
 await client.connect();
/*
 const databasesList = await client.db().admin().listDatabases();
databasesList.databases.forEach(db => console.log(`- ${db.name}`));
for (const dbInfo of databasesList.databases) {
  const dbName = dbInfo.name;
  const db = client.db(dbName);

  // Получение списка коллекций для текущей базы данных
  const collections = await db.listCollections().toArray();
  console.log(`База данных: ${dbName}`);
  collections.forEach(collection => console.log( `- Коллекция: ${collection.name}`));
}*/

    await client.db("admin").command({ ping: 1 });
}

initMongoDB();

const app = express();
const port = process.env.PORT || 8081;

async function getData() {
  console.log("db " + dbName);
  console.log("db ", dbName);
  
  const db = client.db(dbName);
    const data = await db.collection(collectionName).find().toArray();

    const result = await db.command({ ping: 1 });
    console.log(result);
    console.log("data " + data[0])

  data.forEach((sheet) => {
      if (!_.isUndefined(sheet._id)) delete sheet._id;
      console.log("sheet._id = " + sheet._id)
      console.log("sheet.celldata[0].r = " + sheet.celldata[0].r)
      console.log("sheet.celldata[0].c = " + sheet.celldata[0].c)
      console.log("sheet.celldata[0].v = " + sheet.celldata[0].v)
  });
  return data;
}

// get current workbook data
app.get("/", async (req, res) => {
  res.json(await getData());
});

// drop current data and initialize a new one
app.get("/init", async (req, res) => {
    console.log("init")
  const db = client.db(dbName);
  const coll = db.collection(collectionName);
  await coll.deleteMany();
  await db.collection(collectionName).insertOne(defaultData);
  res.json({
    ok: true,
  });

});

const server = app.listen(port, () => {
  console.info(`running on port ${port}`);
});

const connections = {};

const broadcastToOthers = (selfId, data) => {
  Object.values(connections).forEach((ws) => {
    if (ws.id !== selfId) {
      ws.send(data);
    }
  });
};

const wss = new SocketServer({ server, path: `/ws`});

wss.on('connection', (ws, req) => {
  const location = url.parse(req.url, true);

  const pathParts = location.pathname.split('/');
  const id = pathParts[pathParts.length - 1];
  console.log("ID ", id);
  /*
wss.on("connection", (ws, req) => {
  ws.id = uuid.v4();
  connections[ws.id] = ws;
  console.log("ws.id " + ws.id)
  */
  ws.on("message", async (data) => {
    const msg = JSON.parse(data.toString());
      console.log("msg.req " + msg.req)
      console.log(JSON.stringify(msg, null, 2));

    if (msg.req === "getData") {
      ws.send(
        JSON.stringify({
          req: msg.req,
          data: await getData(),
        })
      );
        ws.send(JSON.stringify({ req: "addPresences", data: presences }));
        console.log("presences " + JSON.stringify(presences, null, 2));

    } else if (msg.req === "op") {
      await applyOp(client.db(dbName).collection(collectionName), msg.data);
        broadcastToOthers(ws.id, data.toString());
        console.log("op data.toString " + data.toString());
        console.log("op msg.data " + JSON.stringify(msg.data, null, 2));

    } else if (msg.req === "addPresences") {
      ws.presences = msg.data;
      broadcastToOthers(ws.id, data.toString());
      presences = _.differenceBy(presences, msg.data, (v) =>
        v.userId == null ? v.username : v.userId
        ).concat(msg.data);
        console.log("addPresences concat " + JSON.stringify(presences, null, 2));

    } else if (msg.req === "removePresences") {
      broadcastToOthers(ws.id, data.toString());
    }
  });

  ws.on("close", () => {
    broadcastToOthers(
      ws.id,
      JSON.stringify({
        req: "removePresences",
        data: ws.presences,
      })
    );
    presences = _.differenceBy(presences, ws.presences, (v) =>
      v.userId == null ? v.username : v.userId
    );
    delete connections[ws.id];
  });
});