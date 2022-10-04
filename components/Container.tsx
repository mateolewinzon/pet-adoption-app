import Head from "next/head"
import { NavLink, Footer } from "components"

type Props = {
    children: React.ReactNode
}

export const Container = ({ children, ...customMeta }: Props) => {
    const meta = {
        title: 'Pet Adoption App',
        description: 'Browse and post pets for adoption worldwide.',
        ...customMeta
    }
    return <div>
        <Head>
            <title>{meta.title}</title>
            <meta name="twitter:title" content={meta.title} />
            <meta name="twitter:description" content={meta.description} />
            <meta property="og:site_name" content={meta.title} />
            <meta property="og:description" content={meta.description} />
            <meta property="og:title" content={meta.title} />
        </Head>
        <div className="flex flex-row justify-center px-8">
            <div className="flex items-center justify-between w-full max-w-3xl">
                <nav className="flex">
                    <NavLink href='/' text="Browse" />
                    <NavLink href='/post' text="Post" />
                </nav>
                <nav className="flex">
                    <NavLink href='/profile' text="Profile" />
                    {/* <NavLink href='/login' text="Loign" /> */}
                </nav>
            </div>
        </div>
        <main className="flex flex-col justify-center px-8">
            {children}
        </main>
        <Footer />
    </div>
}