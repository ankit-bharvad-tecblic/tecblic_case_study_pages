import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { connectToDatabase } from "../../lib/mongodb";
import Page from "../../models/Page";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer";
import dynamic from "next/dynamic";

// Dynamically import CKEditor to avoid SSR issues
//const CKEditor = dynamic(() => import("@ckeditor/ckeditor5-react").then(mod => mod.CKEditor), { ssr: false });
// const CKEditor = dynamic(() => import("../../ckeditor5-custom-build"), { ssr: false });

// const CKEditor = dynamic(() => import('@ckeditor/ckeditor5-react').then(m => m.CKEditor), { ssr: false });
// const Editor = dynamic(() => import('../../ckeditor5-custom-build/build/ckeditor'), { ssr: false });

const EditorCustom = dynamic(() => import("../../components/EditorCustom"), {
    ssr: false,
});

export default function CreatePage({ initialPage }) {
    const router = useRouter();
    console.log("initialPage --> ", initialPage)
    const [formData, setFormData] = useState({
        title: initialPage?.pageTitle || "",
        slug: initialPage?.slug || "",
        bannerTitle: initialPage?.bannerTitle || "",
        bannerDescription: initialPage?.bannerDescription || "",
        content: initialPage?.content || "",
        cards: initialPage?.cards || []
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCardChange = (index, field, value) => {
        setFormData(prev => {
            const newCards = [...prev.cards];
            newCards[index] = {
                ...newCards[index],
                [field]: value
            };
            return {
                ...prev,
                cards: newCards
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/admin/pages${initialPage ? `/${initialPage._id}` : ''}`, {
                method: initialPage ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                router.push('/pages');
            } else {
                console.error('Failed to save page');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">
                    {initialPage ? 'Edit Page' : 'Create New Page'}
                </h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Slug</label>
                        <input
                            type="text"
                            name="slug"
                            value={formData.slug}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Banner Title</label>
                        <input
                            type="text"
                            name="bannerTitle"
                            value={formData.bannerTitle}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Banner Description</label>
                        <textarea
                            name="bannerDescription"
                            value={formData.bannerDescription}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            rows="3"
                            required
                        />
                    </div>

                    <div>
                        <h6 className="text-xl font-semibold mb-4">Content</h6>
                        <EditorCustom
                            form={formData}
                            config={{ language: "en" }}
                            handleEditorChange={(event, editor) => {
                                setFormData({ ...formData, content: editor.getData() });
                            }}
                        />
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold mb-4">Cards</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {formData.cards.map((card, index) => (
                                <div key={index} className="border p-4 rounded-lg">
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">Card Title</label>
                                        <input
                                            type="text"
                                            value={card.title}
                                            onChange={(e) => handleCardChange(index, 'title', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Card Description</label>
                                        <textarea
                                            value={card.description}
                                            onChange={(e) => handleCardChange(index, 'description', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                            rows="3"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
                        >
                            {initialPage ? 'Update Page' : 'Create Page'}
                        </button>
                    </div>
                </form>
            </div>
            <Footer />
        </>
    );
}

export async function getServerSideProps(context) {
    await connectToDatabase();
    const { edit } = context.query;

    if (edit) {
        const page = await Page.findById(edit).lean();
        if (page) {
            // Convert _id and date fields to strings
            page._id = page._id.toString();
            page.createdAt = page.createdAt?.toISOString() || null;
            page.updatedAt = page.updatedAt?.toISOString() || null;

            // Convert card _id fields to strings if they exist
            if (page.cards && Array.isArray(page.cards)) {
                page.cards = page.cards.map(card => ({
                    ...card,
                    _id: card._id ? card._id.toString() : null
                }));
            }

            return { props: { initialPage: page } };
        }
    }

    return { props: { initialPage: null } };
} 