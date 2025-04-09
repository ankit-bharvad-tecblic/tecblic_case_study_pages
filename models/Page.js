import mongoose from 'mongoose';

const PageSchema = new mongoose.Schema(
  {
    pageTitle: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    bannerImage: { type: String },
    bannerDescription: { type: String },
    bannerTitle: { type: String },
    content: { type: String }, // CKEditor content
    cards: [{
      title: { type: String },
      description: { type: String },
      link: { type: String }
    }]

  },
  { timestamps: true }
);

export default mongoose.models.Page || mongoose.model('Page', PageSchema);
