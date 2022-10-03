import { Header, Footer } from "components"

type Props = {
    children: React.ReactNode
}

export const Layout = ({children}: Props) => {
    return <div>
        <Header/>
        {children}
        <Footer/>
    </div>
}