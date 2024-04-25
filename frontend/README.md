# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).











To design a structure for saving user progress in your language learning platform, you'll need to consider several factors such as the types of activities users engage in, the granularity of progress tracking, and the features you plan to implement. Here's a suggestion for an entity structure:

UserProgress: This entity will store the progress of each user in their language learning journey. It could include the following attributes:
User ID: A foreign key linking to the User entity.
Learnset ID: A foreign key linking to the Learnset entity to track which learnset the user is progressing through.
Last Completed Word: The ID of the last word the user completed in the learnset.
Current Progress: Additional details about the user's progress, such as the percentage completed or the number of words mastered.
UserActivity: This entity will record specific actions or activities performed by users within the platform. It could include attributes like:
User ID: A foreign key linking to the User entity.
Activity Type: Enumerated field indicating the type of activity (e.g., "Word Quiz Completed," "Lesson Viewed," "Practice Session Started").
Timestamp: Date and time when the activity occurred.
Additional Details: Any other relevant information about the activity, such as the ID of the word or lesson involved.
UserWord: This entity will track individual words and the user's interactions with them. It could include attributes such as:
User ID: A foreign key linking to the User entity.
Word ID: A foreign key linking to the Word entity.
Mastery Level: A value indicating how well the user has mastered the word (e.g., beginner, intermediate, advanced).
Last Practiced: Timestamp indicating when the user last practiced this word.
Additional Details: Any other relevant information about the word-user interaction.
With this structure, you can track both the overall progress of users through learnsets, as well as their interactions with individual words. Additionally, recording user activities allows you to analyze user behavior and tailor the learning experience to their needs.

Remember to adjust and expand this structure based on the specific features and requirements of your language learning platform.
