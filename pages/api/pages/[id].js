import { connectToDatabase } from "../../../lib/mongodb";
import Page from "../../../models/Page";

export default async function handler(req, res) {
    const { id } = req.query;

    if (req.method === 'PUT') {
        try {
            await connectToDatabase();
            const updatedPage = await Page.findByIdAndUpdate(
                id,
                {
                    ...req.body,
                    updatedAt: new Date()
                },
                { new: true }
            );

            if (!updatedPage) {
                return res.status(404).json({ message: 'Page not found' });
            }

            return res.status(200).json(updatedPage);
        } catch (error) {
            console.error('Error updating page:', error);
            return res.status(500).json({ message: 'Error updating page' });
        }
    }

    return res.status(405).json({ message: 'Method not allowed' });
} 