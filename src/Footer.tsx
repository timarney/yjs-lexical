export const Footer = () => {
  return (
    <footer
      className="flex-none border-0 bg-gray-100 px-4 md:px-8 lg:px-12 mt-0"
      data-testid="footer"
    >
      <div className="mx-auto max-w-[1200px] flex flex-col lg:flex-row items-start lg:items-center justify-between py-6">
        <div>
          <nav aria-label="Footer">
            <span className="mr-10 inline-block">
              <a
                className="whitespace-nowrap underline hover:no-underline"
                href="#"
                target="_blank"
              >
                About GC Forms
              </a>
              <span className="px-3">•</span>
              <a
                className="whitespace-nowrap underline hover:no-underline"
                href="#"
              >
                Terms of use
              </a>
              <span className="px-3">•</span>
              <a
                className="whitespace-nowrap underline hover:no-underline"
                href="#"
              >
                Service-level agreement
              </a>
              <span className="px-3">•</span>
              <a
                className="whitespace-nowrap underline hover:no-underline"
                href="#"
              >
                Support
              </a>
            </span>
          </nav>
        </div>
        <div className="min-w-[168px]">
          <picture>
            <img
              className="h-10 lg:h-8"
              alt="Symbol of the Government of Canada"
              src="/img/wmms-blk.svg"
            />
          </picture>
        </div>
      </div>
    </footer>
  );
};
