import "./ProductsHero.css";

function ProductsHero() {

  return (

    <section className="products-hero">

      <div className="container">

        <span className="hero-tag">
          OUR PRODUCTS
        </span>

        <h1>

          Enterprise IT Products
          <span> & Security Solutions</span>

        </h1>

        <p>

          We supply industry-leading IT Infrastructure,
          Networking, CCTV Surveillance,
          Fire Alarm, Biometric,
          Server, Storage and Smart Security Products.

        </p>

        <div className="hero-buttons">

          <button className="btn-primary">
            Browse Products
          </button>

          <button className="btn-outline">
            Download Catalogue
          </button>

        </div>

      </div>

    </section>

  );

}

export default ProductsHero;