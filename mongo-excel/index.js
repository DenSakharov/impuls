/* eslint-disable no-console */
//import queryString from "query-string";

const express = require("express");
const { MongoClient } = require("mongodb");
const SocketServer = require("ws").Server;
const uuid = require("uuid");
const _ = require("lodash");
const { applyOp } = require("./op");
const cors=require('cors');


const dbName = "google-docs-clone";
const collectionName = "workbook";
const uri = "mongodb://78.107.235.216:31000";
const client = new MongoClient(uri);
let presences = [];

async function initMongoDB() {
    
 await client.connect();
    await client.db("admin").command({ ping: 1 });
}

initMongoDB();

const app = express();
const port = process.env.PORT || 8081;
var corsOptions = {
  origin: [`${process.env.HOST}`,"http://localhost:3000"]
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function findOrCreateDocument(objectId, documentObjectId) {
    const db = client.db(dbName);
    console.log("creating");
    if (objectId == null) return
    const document = await db.collection(collectionName).findOne({
        id: objectId
    });
    if (document) return document
    console.log("creating new");
    const newData = {
        name: objectId,
        id: objectId,
        celldata: [{ r: 0, c: 0, v: null }],
        order: 0,
        row: 84,
        column: 60,
        config: {},
        pivotTable: null,
        isPivotTable: false,
        status: 0,
        documentId: documentObjectId
    };
    console.log("created");
    await db.collection(collectionName).insertOne(newData);
    console.log("return");
    const createdDocument = await db.collection(collectionName).findOne({id: objectId});
    return createdDocument
}

async function findDocumentByObjectId(objectId) {
    const db = client.db(dbName);
    if (objectId === null) return
    const document = await db.collection(collectionName).findOne({
        id: objectId
    }).select('__id')
    return document
}
async function getData() {
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

async function getData1(objectId) {
    const db = client.db(dbName);
    const data = await db.collection(collectionName).find({ id: objectId }).toArray()

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
app.get("/", async (req, res) => {
  res.json(await getData());
});


app.get("/workbook/:id", async (req, res) => {
    console.log("app.get ", req.params.objectId)
    res.json(await findDocumentByObjectId(req.params.objectId));
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

const wss = new SocketServer({ server, path: "/workbook/:id" });

const url = require('url')

wss.on("connection", (ws, req) => {
  const location = url.parse(req.url, true);
									
																 
													   
								  
	  
 
					
						  
							   
  
  ws.on("message", async (data) => {
    const msg = JSON.parse(data.toString());

      await findOrCreateDocument(msg.documentId, msg.documentObjectId)
      ws.id = msg.documentId;
     connections[ws.id] = ws;
     console.log("ws.id " + ws.id)

    if (msg.req === "getData") {
      ws.send(
        JSON.stringify({
          req: msg.req,
            data: await getData1(msg.documentId),
        })
        );

        ws.send(JSON.stringify({ req: "addPresences", data: presences }));
																	   

    } else if (msg.req === "op") {
      await applyOp(client.db(dbName).collection(collectionName), msg.data);
        broadcastToOthers(ws.id, data.toString());
														   
																		

    } else if (msg.req === "addPresences") {
      ws.presences = msg.data;
      broadcastToOthers(ws.id, data.toString());
      presences = _.differenceBy(presences, msg.data, (v) =>
        v.userId == null ? v.username : v.userId
        ).concat(msg.data);
																				 

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