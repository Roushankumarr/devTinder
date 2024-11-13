const express = require("express");
const requestRouter = express.Router();
const ConnectionRequest = require("../models/connection"); // Assuming 'connectionRequest' is a model
const { userAuth } = require("../middlewares/userAuth");

requestRouter.post("/request/send/:status/:userId", userAuth, async (req, res) => {
  try {
    const fromUserId = req.user._id;
    const toUserId = req.params.userId; // Correct usage of params
    const status = req.params.status; // Correct usage of params

    // Allowed statuses for the request
    const allowedStatus = ["ignored", "interested"];
    if (!allowedStatus.includes(status)) {
      return res.status(400).send("Status is not valid");
    }

    // Check if a connection request already exists
    const existingConnectionRequest = await ConnectionRequest.findOne({
      $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId },
      ]
    });

    if (existingConnectionRequest) {
      return res.status(400).json({
        message: "Connection request already exists",
      });
    }

    // Create a new connection request
    const newConnectionRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status,
    });

    // Save the new connection request
    const data = await newConnectionRequest.save();

    res.status(200).json({
      message: "Connection request sent successfully",
      data
    });

  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

requestRouter.post("/request/review/:status/:requestId", userAuth, async (req, res) => {
  // Get the logged-in user from the middleware
  const loggedInuser = req.user;

  // Get the status and requestId from the request parameters
  const { status, requestId } = req.params;

  // Check if the provided status is valid
  const allowedStatus = ["accepted", "rejected"];
  if (!allowedStatus.includes(status)) {
    throw new Error("Status is not valid");
  }

  // Find the connection request in the database
  const foundRequest = await ConnectionRequest.findOne({
    _id: requestId,
    toUserId: loggedInuser._id,
    status: "interested",
  });

  // If no request is found, return an error message
  if (!foundRequest) {
    return res.status(400).json({
      message: "No connection request found",
    });
  }

  // Update the status and save the request
  foundRequest.status = status;
  const data = await foundRequest.save();

  // Send a success response
  res.status(200).json({
    message: "Connection request updated successfully",
    data,
  });
});

module.exports = { requestRouter };
