const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the schema for connection requests
const connectionRequestSchema = new Schema({
  fromUserId: {
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true ,
  },
  toUserId: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true ,
  },
  status: {
    type: String,
    enum: ["ignored", "interested"],
    required: true
  },
  
 
},{
  timestamps:true,
});

connectionRequestSchema.pre("save",function(){

  const connectionRequest = this;
  // same users cannot send request to itself
  if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
    throw new Error("Connection cannot be made");
  }

  next();

 })



// Create the model from the schema
const ConnectionRequest = mongoose.model('ConnectionRequest', connectionRequestSchema);

// Export the model
module.exports = ConnectionRequest;
