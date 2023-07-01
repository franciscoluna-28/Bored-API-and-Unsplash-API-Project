import mongoose, { Schema, Document } from 'mongoose';

// Definición del esquema de actividad
interface IActivity extends Document {
  activity: string;
  type: string;
  participants: number;
  price: number;
  link: string;
  accessibility: number;
  id: string;
  image: {
    id: string;
    urls: {
      raw: string;
      full: string;
      regular: string;
      small: string;
      thumb: string;
      small_s3: string;
    };
    user: {
      name: string;
      links: {
        self: string;
        photos: string;
      };
    };
  };
}

const activitySchema: Schema = new Schema({
  activity: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  participants: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  accessibility: {
    type: Number,
    required: true,
  },
  id: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    id: {
      type: String,
      required: true,
    },
    urls: {
      raw: {
        type: String,
        required: true,
      },
      full: {
        type: String,
        required: true,
      },
      regular: {
        type: String,
        required: true,
      },
      small: {
        type: String,
        required: true,
      },
      thumb: {
        type: String,
        required: true,
      },
      small_s3: {
        type: String,
        required: true,
      },
    },
    user: {
      name: {
        type: String,
        required: true,
      },
      links: {
        self: {
          type: String,
          required: true,
        },
        photos: {
          type: String,
          required: true,
        },
      },
    },
  },
});

const Activity = mongoose.model<IActivity>('Activity', activitySchema);

export default Activity;
