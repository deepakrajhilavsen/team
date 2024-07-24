const { default: mongoose } = require("mongoose");

const experienceSchema = new mongoose.Schema(
  {
    experience: {
      type: String,
      enum: ["Fresher", "Student", "Experienced"],
    },
    jobHistory: [
      {
        role: String,
        company: String,
        startDate: Date,
        current: Boolean,
        endDate: {
          type: Date,
          validate: {
            validator: (value) => {
              if (this.current) value = null;
              else value instanceof Date;
            },
          },
        },
      },
    ],
  },
  { _id: false }
);

module.exports = experienceSchema;
