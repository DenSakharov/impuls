const {Schema, model } = require('mongoose') 

const DocumentExcel = new Schema({
    _id: String,
    data: Object,
    name: String,
    id: String,
    celldata: Object,
    order:Number,
    row: Number,
    column: Number,
      config: Object,
  pivotTable: null,
  isPivotTable: Boolean,
  status: Number,
    documentId: String
})

module.exports = model("DocumentExcel", DocumentExcel)