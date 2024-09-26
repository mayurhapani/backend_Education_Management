import mongoose, { Schema } from "mongoose";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";

const courseSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    assignments: [
      {
        title: String,
        description: String,
        dueDate: Date,
      },
    ],
  },
  { timestamps: true }
);

courseSchema.plugin(aggregatePaginate);

export const courseModel = mongoose.model("Course", courseSchema);
