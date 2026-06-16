import { useState } from "react";
import "./App.css";

function App() {
  const producten = [
    { id: 1, naam: "Gaming Muis", prijs: 29.99 },
    { id: 2, naam: "Mechanisch Toetsenbord", prijs: 79.99 },
    { id: 3, naam: "Gaming Headset", prijs: 49.99 },
    { id: 4, naam: "Gaming Monitor", prijs: 199.99 },
  ];

  const [winkelmand, setWinkelmand] = useState([]);
  const [mandOpen, setMandOpen] = useState(false);

  const [naam, setNaam] = useState("");
  const [email, setEmail] = useState("");
  const [adres, setAdres] = useState("");
  const [telefoon, setTelefoon] = useState("");

  const [besteld, setBesteld] = useState(false);
  const [bestelNummer, setBestelNummer] = useState(null);

  const voegToe = (product) => {
    setWinkelmand([...winkelmand, product]);
    setMandOpen(true);
    setBesteld(false);
  };

  const plaatsBestelling = () => {
    if (
      naam.trim() === "" ||
      email.trim() === "" ||
      adres.trim() === "" ||
      telefoon.trim() === ""
    ) {
      alert("Vul alle velden in.");
      return;
    }
  
    const nummer = Math.floor(Math.random() * 100000);
  
    setBestelNummer(nummer);
    setBesteld(true);
  };
  const nieuweBestelling = () => {
    setWinkelmand([]);
    setNaam("");
    setEmail("");
    setAdres("");
    setTelefoon("");
    setBesteld(false);
    setBestelNummer(null);
    setMandOpen(false);
  };

  const totaalPrijs = winkelmand.reduce((totaal, product) => {
    return totaal + product.prijs;
  }, 0);

  return (
    <>
      <header className="header">
        <h2>MiniByts</h2>

        <button className="cart-button" onClick={() => setMandOpen(true)}>
          Winkelmand ({winkelmand.length})
        </button>
      </header>

      <section className="welcome">
        <h1>Welkom bij MiniByts</h1>
      </section>

      <main className="producten">
        {producten.map((product) => (
          <div className="product" key={product.id}>
            <h3>{product.naam}</h3>
            <p>€{product.prijs}</p>
            <button onClick={() => voegToe(product)}>Toevoegen</button>
          </div>
        ))}
      </main>

      <footer className="footer">Footer</footer>

      <div
        className={mandOpen ? "overlay show" : "overlay"}
        onClick={() => setMandOpen(false)}
      ></div>

      <aside className={mandOpen ? "winkelmand open" : "winkelmand"}>
        <button className="sluit-knop" onClick={() => setMandOpen(false)}>
          X
        </button>

        <h2>Winkelmand</h2>

        {winkelmand.length === 0 ? (
          <p>Je winkelmand is leeg.</p>
        ) : (
          <>
            {winkelmand.map((product, index) => (
              <div className="mand-product" key={index}>
                <div>
                  <span>{product.naam}</span>
                  <p>€{product.prijs}</p>
                </div>

                <button
                  className="verwijder-knop"
                  onClick={() => verwijderProduct(index)}
                >
                  Verwijder
                </button>
              </div>
            ))}

            <div className="mand-totaal">
              <strong>Totaal:</strong>
              <strong>€{totaalPrijs.toFixed(2)}</strong>
            </div>

            {besteld ? (
              <div className="bestelling-gelukt">
                <h3>✅ Bestelling succesvol geplaatst!</h3>

                <p>
                  <strong>Bestelnummer:</strong> #{bestelNummer}
                </p>

                <p>Bedankt voor uw bestelling bij MiniByts.</p>

<button
  className="bestel-knop"
  onClick={nieuweBestelling}
>
  Nieuwe bestelling
</button>
              </div>
            ) : (
              <>
                <input
                  type="text"
                  placeholder="Volledige naam"
                  value={naam}
                  onChange={(e) => setNaam(e.target.value)}
                />

                <input
                  type="email"
                  placeholder="E-mailadres"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <input
                  type="text"
                  placeholder="Adres"
                  value={adres}
                  onChange={(e) => setAdres(e.target.value)}
                />

                <input
                  type="tel"
                  placeholder="Telefoonnummer"
                  value={telefoon}
                  onChange={(e) => setTelefoon(e.target.value)}
                />

                <button className="bestel-knop" onClick={plaatsBestelling}>
                  Bestelling plaatsen
                </button>
              </>
            )}
          </>
        )}
      </aside>
    </>
  );
}

export default App;