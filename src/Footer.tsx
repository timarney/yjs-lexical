export const Footer = () => {
  return (
    <footer
      className="flex-none border-0 bg-gray-100 px-24 mt-0 lg:mt-0"
      data-testid="footer"
    >
      <div className="flex flex-row items-center justify-between pb-5 pt-10 lg:flex-col lg:items-start lg:gap-4">
        <div>
          <nav aria-label="Footer">
            <span className="mr-10 inline-block">
              <a
                className="whitespace-nowrap"
                href="https://articles.alpha.canada.ca/forms-formulaires/?utm_source=EN_FormsFooter&amp;utm_medium=Product&amp;utm_campaign=forms_product"
                target="_blank"
              >
                About GC Forms
              </a>
              <span className="px-3">•</span>
              <a className="whitespace-nowrap" href="/en/terms-of-use">
                Terms of use
              </a>
              <span className="px-3">•</span>
              <a className="whitespace-nowrap" href="/en/sla">
                Service-level agreement
              </a>
              <span className="px-3">•</span>
              <a href="/en/support">Support</a>
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
