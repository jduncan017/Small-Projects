import "./Scroll.css";

// Your task is to implement scroll to section for buttons in the menu
// Clicking on it should scroll your page to particular section
// Must be solved without using React Library or anchor tags.

// This solution focuses on rendering dynamic content that will be easy to manage
// as the project grows or if implimentation changes. PAGE_SECTIONS gets rendered
// into both buttons and sections, and buttons are automatically mapped to scroll to each section.
const PAGE_SECTIONS = [
  {
    title: "Section 1",
    id: "section1",
    text: `Lorem Ipsum is simply dummy text of the printing and typesetting
    industry. Lorem Ipsum has been the industry's standard dummy text ever
    since the 1500s, when an unknown printer took a galley of type and
    scrambled it to make a type specimen book. It has survived not only five
    centuries, but also the leap into electronic typesetting, remaining
    essentially unchanged. It was popularised in the 1960s with the release
    of Letraset sheets containing Lorem Ipsum passages, and more recently
    with desktop publishing software like Aldus PageMaker including versions
    of Lorem Ipsum.`,
  },
  {
    title: "Section 2",
    id: "section2",
    text: `Lorem Ipsum is simply dummy text of the printing and typesetting
    industry. Lorem Ipsum has been the industry's standard dummy text ever
    since the 1500s, when an unknown printer took a galley of type and
    scrambled it to make a type specimen book. It has survived not only five
    centuries, but also the leap into electronic typesetting, remaining
    essentially unchanged. It was popularised in the 1960s with the release
    of Letraset sheets containing Lorem Ipsum passages, and more recently
    with desktop publishing software like Aldus PageMaker including versions
    of Lorem Ipsum.`,
  },
  {
    title: "Section 3",
    id: "section3",
    text: `Lorem Ipsum is simply dummy text of the printing and typesetting
    industry. Lorem Ipsum has been the industry's standard dummy text ever
    since the 1500s, when an unknown printer took a galley of type and
    scrambled it to make a type specimen book. It has survived not only five
    centuries, but also the leap into electronic typesetting, remaining
    essentially unchanged. It was popularised in the 1960s with the release
    of Letraset sheets containing Lorem Ipsum passages, and more recently
    with desktop publishing software like Aldus PageMaker including versions
    of Lorem Ipsum.`,
  },
  {
    title: "Section 4",
    id: "section4",
    text: `Lorem Ipsum is simply dummy text of the printing and typesetting
    industry. Lorem Ipsum has been the industry's standard dummy text ever
    since the 1500s, when an unknown printer took a galley of type and
    scrambled it to make a type specimen book. It has survived not only five
    centuries, but also the leap into electronic typesetting, remaining
    essentially unchanged. It was popularised in the 1960s with the release
    of Letraset sheets containing Lorem Ipsum passages, and more recently
    with desktop publishing software like Aldus PageMaker including versions
    of Lorem Ipsum.`,
  },
];

const Scroll = () => {
  function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);

    section.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="container">
      {/* Section Buttons */}
      <div className="menu">
        {PAGE_SECTIONS.map((section, index) => {
          return (
            <button
              key={section.id}
              className="scroll__button"
              onClick={() => scrollToSection(section.id)}
            >
              {section.title}
            </button>
          );
        })}
      </div>
      {/* Page Sections */}
      <h1 className="scroll__page-title">Page Title</h1>
      {PAGE_SECTIONS.map((section) => {
        return (
          <div className="section" key={section.id}>
            <h2 id={section.id} className="scroll__section-text">
              {section.title}
            </h2>
            <p>{section.text}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Scroll;
