import { connectToDatabase } from "../../lib/mongodb";
import Page from "../../models/Page";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer";
import Link from "next/link";
import { useRouter } from "next/router";
// import "../../styles/pages-list.css";

export default function PagesList({ pages }) {
    const router = useRouter();

    const handleDownload = async (slug) => {
        try {
            const response = await fetch(`/api/pages/download/${slug}`);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${slug}.html`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.error('Error downloading page:', error);
            alert('Error downloading page');
        }
    };

    return (
        <>
            <Navbar />
            <div className="pages-container">
                <div className="pages-header">
                    <h1 className="pages-title">All Pages</h1>

                    <button
                        onClick={() => router.push(`/pages/create`)}
                        className="edit-button"
                    >
                        Create New Page
                    </button>
                </div>
                <div className="pages-grid">
                    {pages.map((page) => (
                        <div key={page._id} className="page-card">
                            <h2 className="page-title">{page.pageTitle}</h2>
                            {/* <p className="text-gray-600 mb-4">{page.bannerDescription}</p> */}
                            <div className="page-actions">

                                <button
                                    onClick={() => router.push(`/pages/${page.slug}`)}
                                    className="edit-button view-link"
                                >
                                    View Page
                                </button>
                                <div className="action-buttons">
                                    <button
                                        onClick={() => router.push(`/pages/create?edit=${page._id}`)}
                                        className="edit-button"
                                    >
                                        Edit
                                    </button>
                                    <a
                                        href={`/api/export-html?slug=${page.slug}`}
                                        download={`${page.slug}.html`}
                                    >
                                        <button className="download-button">Download Page</button>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
}

export async function getServerSideProps() {
    await connectToDatabase();
    const pages = await Page.find({}).sort({ createdAt: -1 }).lean();

    // Convert _id and date fields to strings for all pages and their cards
    const serializedPages = pages.map((page) => ({
        ...page,
        _id: page._id.toString(),
        createdAt: page.createdAt?.toISOString() || null,
        updatedAt: page.updatedAt?.toISOString() || null,
        cards: page.cards?.map(card => ({
            ...card,
            _id: card._id?.toString() || null,
            createdAt: card.createdAt?.toISOString() || null,
            updatedAt: card.updatedAt?.toISOString() || null
        })) || []
    }));

    return {
        props: {
            pages: serializedPages,
        },
    };
} 