import { connectToDatabase } from "../../lib/mongodb";
import Page from "../../models/Page";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer";
import Link from "next/link";
import { useRouter } from "next/router";

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
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">All Pages</h1>
                <Link href={`/pages/create`} className="text-blue-600 hover:underline">
                    Create New Page
                </Link>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pages.map((page) => (
                        <div key={page._id} className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-semibold mb-2">{page.pageTitle}</h2>
                            {/* <p className="text-gray-600 mb-4">{page.bannerDescription}</p> */}
                            <div className="flex justify-between items-center">
                                <Link href={`/pages/${page.slug}`} className="text-blue-600 hover:underline">
                                    View Page
                                </Link>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => router.push(`/pages/create?edit=${page._id}`)}
                                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                                    >
                                        Edit
                                    </button>
                                    {/* <button
                                        onClick={() => handleDownload(page.slug)}
                                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                                    >
                                        Download
                                    </button> */}

                                    <a
                                        href={`/api/export-html?slug=${page.slug}`}
                                        download={`${page.slug}.html`}
                                    >
                                        <button>Download Page</button>
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