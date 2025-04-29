// MongoDB schema utilities for user communication tracking

// Function to create schema validator for user communications
export const getUserCommunicationSchema = () => {
  return {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["email", "communicationType", "status", "createdAt"],
        properties: {
          name: {
            bsonType: "string",
            description: "User's name"
          },
          email: {
            bsonType: "string",
            description: "User's email address",
            pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
          },
          institution: {
            bsonType: "string",
            description: "User's educational institution"
          },
          phone: {
            bsonType: "string",
            description: "User's phone number"
          },
          communicationType: {
            enum: ["early_access", "newsletter", "campus_ambassador", "contact", "other"],
            description: "Type of communication"
          },
          resumeLink: {
            bsonType: "string",
            description: "URL to user's resume (if applicable)"
          },
          motivation: {
            bsonType: "string",
            description: "User's motivation (for campus ambassador applications)"
          },
          message: {
            bsonType: "string",
            description: "Message content for general inquiries"
          },
          status: {
            enum: ["pending", "reviewed", "approved", "rejected", "contacted"],
            description: "Status of the communication"
          },
          notes: {
            bsonType: "string",
            description: "Admin notes about this communication"
          },
          year: {
            bsonType: "string",
            description: "Year of study (for students)"
          },
          interests: {
            bsonType: "array",
            description: "User's areas of interest",
            items: {
              bsonType: "string"
            }
          },
          skills: {
            bsonType: "array",
            description: "User's skills",
            items: {
              bsonType: "string"
            }
          },
          createdAt: {
            bsonType: "date",
            description: "Timestamp when the communication was received"
          },
          updatedAt: {
            bsonType: "date",
            description: "Timestamp when the record was last updated"
          },
          adminResponses: {
            bsonType: "array",
            description: "History of admin responses to this user",
            items: {
              bsonType: "object",
              required: ["date", "adminId", "message"],
              properties: {
                date: {
                  bsonType: "date",
                  description: "When the response was sent"
                },
                adminId: {
                  bsonType: "string",
                  description: "ID of the admin who responded"
                },
                message: {
                  bsonType: "string",
                  description: "Content of the response"
                }
              }
            }
          }
        }
      }
    }
  };
};

// Initialize database collections with schema validation
export const initUserCommunicationsCollections = async (db) => {
  // Check if collections already exist before creating them
  const collections = await db.listCollections().toArray();
  const collectionNames = collections.map(c => c.name);
  
  // Create or update user_communications collection
  if (!collectionNames.includes("user_communications")) {
    await db.createCollection("user_communications", getUserCommunicationSchema());
    
    // Create indexes for efficient querying
    await db.collection("user_communications").createIndex({ email: 1 });
    await db.collection("user_communications").createIndex({ communicationType: 1 });
    await db.collection("user_communications").createIndex({ status: 1 });
    await db.collection("user_communications").createIndex({ createdAt: 1 });
    
    console.log("Created user_communications collection with schema validation");
  }
  
  return {
    userCommunications: db.collection("user_communications")
  };
};

// Helper for checking if user has previously communicated
export const hasUserCommunicated = async (db, email, communicationType) => {
  const count = await db.collection("user_communications").countDocuments({
    email,
    communicationType
  });
  
  return count > 0;
};

// Helper for creating a new communication record
export const createCommunicationRecord = async (db, communicationData) => {
  const now = new Date();
  
  // Add timestamps
  const recordToInsert = {
    ...communicationData,
    createdAt: now,
    updatedAt: now
  };
  
  const result = await db.collection("user_communications").insertOne(recordToInsert);
  return result;
};

// Helper for updating a communication record
export const updateCommunicationRecord = async (db, recordId, updateData) => {
  const now = new Date();
  
  const result = await db.collection("user_communications").updateOne(
    { _id: recordId },
    { 
      $set: { 
        ...updateData,
        updatedAt: now 
      } 
    }
  );
  
  return result;
};

// Helper for adding admin response to a communication
export const addAdminResponse = async (db, recordId, adminId, message) => {
  const now = new Date();
  
  const result = await db.collection("user_communications").updateOne(
    { _id: recordId },
    { 
      $push: { 
        adminResponses: {
          date: now,
          adminId,
          message
        } 
      },
      $set: { updatedAt: now }
    }
  );
  
  return result;
};