const Footer = () => {
    return (
        <footer className="footer p-10 bg-base-200 text-base-content items-center justify-between flex">
            <aside>
                <img src="https://i.ibb.co/m5MYT3Pn/tuition-logo.png" alt="logo" className="w-12 h-12 rounded-full" />
                <p className="font-bold text-xl">eTuitionBd<br /><span className="text-sm font-normal">Providing reliable education since 2024</span></p>
            </aside> 
            <div className="flex justify-between items-center gap-50">
                <nav>
                <header className="footer-title text-center">Services</header> 
                <div className="flex justify-between items-center gap-4">
                    <a className="link link-hover">Home Tuition</a> 
                <a className="link link-hover">Online Coaching</a> 
                <a className="link link-hover">Group Study</a>
                </div>
            </nav> 
            <nav>
                <header className="footer-title text-center">Company</header> 
                <div className="flex justify-between items-center gap-4">
                    <a className="link link-hover">About us</a> 
                <a className="link link-hover">Contact</a> 
                <a className="link link-hover">Become a Tutor</a>
                </div>
            </nav> 
            <nav>
                <header className="footer-title text-center">Legal</header> 
                <div className="flex gap-4">
                    <a className="link link-hover">Terms of use</a> 
                <a className="link link-hover">Privacy policy</a> 
                <a className="link link-hover">Cookie policy</a>
                </div>
            </nav>
            </div>
        </footer>
    );
};

export default Footer;