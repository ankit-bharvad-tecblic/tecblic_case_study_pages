// pages/pages/[slug].js
import Navbar from "../../components/Navbar/Navbar";
import { connectToDatabase } from "../../lib/mongodb";
import Page from "../../models/Page";
import Head from "next/head";
import Footer from "../../components/Footer";
export default function DynamicPage({ page }) {
    console.log(page)
    const icons = ["🤖", "🏢", "🛠️", "📄"];
    return (
        <>
            <Head>
                <title>{page.title}</title>
            </Head>
            <Navbar />
            <div>
                <section className="hero-section">
                    <div className="hero-overlay">
                        <h1 className="hero-title">{page.bannerTitle}</h1>
                        <p className="hero-description">
                            {page.bannerDescription}
                        </p>
                    </div>
                </section>
                <div class="content-container">
                    <div dangerouslySetInnerHTML={{ __html: page.content }} />
                </div>
                <div class="card-container">

                    <div class="card-container-inner">

                        <div class="header">
                            <div>
                                <h2>Other Services</h2>
                                <p>Our mission is to empower businesses with cutting-edge AI technologies that enhance performance, streamline operations, and drive growth.</p>
                            </div>
                            <button class="show-more">Show More</button>
                        </div>

                        <div class="card-grid">
                            {page?.cards?.map((card, index) => (
                                <div class="card">
                                    <div class="card-icon">{icons[index]}</div>
                                    <div class="card-title">{card.title}</div>
                                    <div class="card-desc">{card.description}</div>
                                </div>
                            ))}

                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}



export async function getServerSideProps(context) {
    await connectToDatabase();
    const page = await Page.findOne({ slug: context.params.slug }).lean();

    if (!page) return { notFound: true };

    // ✅ Convert _id and date fields to strings
    page._id = page?._id.toString();
    page.createdAt = page.createdAt?.toISOString() || null;
    page.updatedAt = page.updatedAt?.toISOString() || null;

    page.cards = page.cards.map(card => ({
        ...card,
        // _id: card?._id?.toString(),
        createdAt: card.createdAt?.toISOString() || null,
        updatedAt: card.updatedAt?.toISOString() || null
    }));
    return { props: { page } };
}

