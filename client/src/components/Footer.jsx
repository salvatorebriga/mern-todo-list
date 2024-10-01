function Footer() {
  return (
    <>
      <footer className="py-4 dark:bg-gray-900 px-4 text-xs md:text-base font-semibold border-t border-gray-300 dark:border-none 2xl:text-xl">
        <div className="container mx-auto flex justify-between">
          <p>Created by Briga Salvatore</p>
          <div className="flex gap-5">
            <a
              className="hover:underline"
              href="https://github.com/salvatorebriga"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              className="hover:underline"
              href="https://www.linkedin.com/in/salvatore-briga-555a62299/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Linkedin
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
export default Footer;
