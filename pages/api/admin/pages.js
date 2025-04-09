import { connectToDatabase } from '../../../lib/mongodb';
import Page from '../../../models/Page';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      await connectToDatabase();

      const { pageTitle, slug, bannerImage, content, bannerTitle, bannerDescription, cards } = req.body;

      const page = await Page.create({ pageTitle, slug, bannerImage, content, bannerTitle, bannerDescription, cards });

      res.status(201).json({ success: true, page });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }

  } else if (req.method === 'GET') {
    try {
      await connectToDatabase();

      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ success: false, message: 'Page ID is required' });
      }

      const page = await Page.findById(id);

      if (!page) {
        return res.status(404).json({ success: false, message: 'Page not found' });
      }

      res.status(200).json({ success: true, page });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  } else if (req.method === 'PUT') {
    try {
      await connectToDatabase();

      const { id } = req.query;
      const { pageTitle, slug, bannerImage, content, bannerTitle, bannerDescription, cards } = req.body;

      if (!id) {
        return res.status(400).json({ success: false, message: 'Page ID is required' });
      }

      const page = await Page.findById(id);

      if (!page) {
        return res.status(404).json({ success: false, message: 'Page not found' });
      }

      // Update the page with new data
      const updatedPage = await Page.findByIdAndUpdate(
        id,
        { pageTitle, slug, bannerImage, content, bannerTitle, bannerDescription, cards },
        { new: true, runValidators: true }
      );

      res.status(200).json({ success: true, page: updatedPage });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}




// import { connectToDatabase } from '../../../lib/mongodb';
// import Page from '../../../models/Page';

// export default async function handler(req, res) {
//   if (req.method === 'POST') {
//     try {
//       await connectToDatabase();

//       const { pageTitle, slug, bannerImage, content, bannerTitle, bannerDescription, cards } = req.body;

//       const page = await Page.create({ pageTitle, slug, bannerImage, content, bannerTitle, bannerDescription, cards });

//       res.status(201).json({ success: true, page });
//     } catch (err) {
//       res.status(500).json({ success: false, message: err.message });
//     }
//   } else {
//     res.status(405).end(); // Method Not Allowed
//   }
// }
