# Persodict

A language dictionary application. This project provides a user-friendly interface with micro-animations for users to input words and receive translations in multiple languages at once, along with customizable settings to enhance the translation experience. This app has been built according the Octagonal Architecture Principle, with emphasis on separation between logic and UI leveraging the power of custom hooks.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Components](#components)
- [Contributing](#contributing)
- [License](#license)

## Features

- Input field for entering words to translate.
- Submit button to process translations.
- Displays translated words.
- Settings module for customizing translation preferences including languages to translate into.
- Responsive design with styled components.

## Technologies Used

- **Next.js**
- **Typescript**
- **Styled-components**
- **NextAuth**
- **Framer-Motion**
- **Custom Hooks**

## Installation

To get started with the project, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/aghyadallogie/Persodict
   ```

2. Navigate to the project directory:
   ```bash
   cd Persodict
   ```

3. Install the dependencies:
   ```bash
   yarn install
   ```

4. Start the development server:
   ```bash
   yarn dev
   ```

5. Open your browser and go to `http://localhost:3000` to view the application.

## Usage

1. Select the languages you want to translate into in the settings tab.
2. Go to Home tab and enter a word in the input field.
3. Click the submit button to translate the word into the languages you have selected.
3. View the translated word displayed below the form.
4. Access the History tab to view your previously made translations.

## Components

- **TranslateModule**: Main component for handling translations.
- **TranslatedWord**: Displays the translated word through the component `WordView`.
- **Settings Module**: Allows users to configure translation settings.


## Contributing

Contributions are welcome! If you would like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix:
   ```bash
   git checkout -b feature/YourFeature
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m "Add your message here"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/YourFeature
   ```
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Feel free to customize this README further based on your project's specific details, such as adding screenshots, examples, or any additional sections that may be relevant.
