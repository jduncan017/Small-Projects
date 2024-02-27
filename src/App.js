import "./App.css";
import {
  Summary,
  GradientButton,
  MultiSelect,
  Scroll,
} from "./SiPhoxHealthProblems";
import Header from "./Header/Header";

function App() {
  return (
    <div className="app">
      <Header />
      <div className="small-projects">
        <section className="project__container">
          <h1 className="section__title">Summary</h1>
          <p className="section__description">
            The goal of this project was to generate a summary with the lowest
            time complexity from 3 arrays containing order data.
          </p>
          <Summary />
        </section>
        <section className="project__container">
          <h1 className="section__title">GradientButton</h1>
          <p className="section__description">
            A cool button with a hover animation that moves the background
            color.
          </p>
          <GradientButton />
        </section>
        <section className="project__container">
          <h1 className="section__title">MultiSelect</h1>
          <p className="section__description">
            A fully functional multiselect dropdown input. A lot of thought was
            put into user experience for this, including accessibility and
            keyboard nav.
          </p>
          <MultiSelect />
        </section>
        <section className="project__container">
          <h1 className="section__title">Scroll</h1>
          <p className="section__description">
            Auto-generated scrollTo buttons that are rendered from a text object
            at the same time as the text itself.
          </p>
          <Scroll />
        </section>
      </div>
    </div>
  );
}

export default App;
