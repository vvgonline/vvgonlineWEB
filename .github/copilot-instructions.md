# VVG Online - Github Copilot Instructions

## Project overview

This is Official website For a digital Business consulting agency Called VVG Online.

## Project purpose

- Primary goal: To provide information about the digital business consulting services and to attract the potential customers
- Target audience: Small and medium sized business owners seeking beauty business consulting services.
- Key features: Service descriptions, client testimonials, contact form, blog section.
- Content focus: Simple, clear and precise Language that focuses on providing information About the services and the benefits Of working with VVG Online.
- Design style: Clean, modern and professional design with a focus on usability and user experience.

## Technologies stack

- Frontend: HTML, CSS, JavaScript
- Backend:
- Database:
- Hosting: Github Pages

## Project structure guidelines

### Web/ Directory structure

    - /assets: Contains all static assets such as images, fonts, and icons.
        - /css: Contains all CSS files for styling the website.
        - /components-lib: Contains reusable components such as buttons, forms, and navigation bars.
        - /images: Contains all image files used in the website.
        - /scripts: Contains all JavaScript files for interactivity and functionality.
        - / Videos: Contains all video files used in the website.
    - /Blog: All the blog related files.

## Coding Standards & Best Practices

### Front end guidelines

- Mobile-first responsive design
- Accessibility compliance (WCAG 2.1 AA)
- Progressive enhancement
- Semantic HTML5 structure
- Modern CSS with CSS Grid and Bootstrap
- Minimal JavaScript, prefer vanilla JS over heavy frameworks

### Naming Conventions

- Use kebab-case for file and folder names (e.g., `main-styles.css`, `header-component.js`)
- CSS Classes: Use BEM methodology (block\_\_element--modifier)
- JavaScript Variables and Functions: Use camelCase (e.g., `fetchData`, `userProfile`)
- Pages: Descriptive names matching URL structure

## Content Strategy

### Content types

### SEO considerations

    - Target keywords: "digital business consulting", "business growth strategies", "online business solutions"
    - Create comprehensive, valuable content that ranks well
    - Optimize meta titles, descriptions, and headers with target keywords and for featured snippets and voice search.
    - Use descriptive, keyword-rich URLs. Implement proper internal linking structure.
    - Ensure fast loading times and mobile optimization

## Performance Optimizations

     - Implement lazy loading for images and content
     - Minimize HTTP requests and use sprite sheets for icons
     - Optimize images and videos for faster loading times
     - Use a Content Delivery Network (CDN) for static assets

## Development Notes

     - Prioritize user experience and content quality
     - Keep the design clean and professional
     - Ensure fast loading times across all devices
     - Make content easily discoverable and shareable
     - Plan for scalability as content grows

     ### Tips Head tag and meta tags
      - Try to use this structure
        ```html
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta name="description" content="A short summary of the page content">
          <meta name="author" content="Author or Team Name">
          <meta name="keywords" content="keyword1, keyword2, keyword3">
          <meta name="robots" content="index, follow">
          <meta name="title" content="Descriptive Title">
          <meta name="category" content="Main Category">
          <meta name="tags" content="tag1, tag2, tag3">
          <meta name="difficulty" content="Beginner">
          <meta name="publishedDate" content="2023-10-01">
          <meta name="lastModified" content="2023-10-05">
          <meta name="series" content="Series Name"> <!-- Optional -->
          <meta name="part" content="1"> <!-- Optional -->
          <meta name="featured" content="true"> <!-- Optional -->
          <title>Descriptive Title</title>
      </head>
      <body>
          <!-- Your content goes here -->
      </body>
      </html>
      ```
      - Use descriptive and keyword-rich titles for each page
      - Include meta descriptions that accurately summarize the content of each page
      - Use Open Graph tags for better social media sharing
      - Implement structured data (Schema.org) for enhanced search results
      - All fields except series, part, and featured are required unless otherwise noted.
      - Use ISO date format for dates.
      - Use descriptive, unique titles and tags.
      - Update lastModified whenever the Page is edited.
