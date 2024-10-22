# Twinkl React Tech Test


## Task description
You are tasked with creating a React application that interacts with a Posts management API (https://jsonplaceholder.typicode.com/posts) to perform CRUD operations (Create, Read, Update, Delete). The application should be implemented using TypeScript and designed to be production-ready.

Refer to the guide on how to use the jsonplaceholder API:
https://jsonplaceholder.typicode.com/guide/

#### Time Limit: We don't expect you to spend longer than 3 hours on this task. If you'd like to capture any decisions, thoughts, or next steps you would take, feel free to do so.

#### Requirements
##### Fetch and display posts
- Implement a component that fetches the list of posts from https://jsonplaceholder.typicode.com/posts - [ ]
- Display all fetched posts in a list format. - [ ]

##### Search mechanism
- Implement a search bar that allows a user to search for posts by title and display only the desired posts. The search should be triggered on change. - [ ]

##### Delete post
- For each post in the list, provide a "Remove" button. - [ ]
- Implement the functionality to delete a post when the "Remove" button is clicked, using the appropriate server-side REST API method DELETE. - [ ]

##### Testing
- Write sufficient tests to satisfy a production-ready application. - [ ]

##### Documentation
- Add appropriate documentation for your application. - [ ]

#### Wireframes

##### Mobile
![mobile_view](src/assets/mobile_view.png?raw=true)
##### Desktop
![pc_view](src/assets/pc_view.png?raw=true)

## Getting Started
### Prerequisites
- Node.js: Ensure you have Node.js version 20 or higher installed.

### Installation
#### Clone the repository:

```
git clone https://github.com/twinkltech/twinkl-react-tech-test.git
```
```
cd twinkl-react-tech-test
```

#### Install dependencies:
```
yarn
```

### Scripts
#### Development Server: Start the development server.
```
yarn dev
```

#### Lint: Lint the codebase.
```
yarn lint
```

#### Lint & Fix: Lint and automatically fix issues in the codebase.
```
yarn lint:fix
```

#### Format: Format the codebase using Prettier.
```
yarn format
```

#### Test: Run the test suite.
```
yarn test
```

#### Twinkl Tech Task Notes: George

Started within App and ran the yarn commands to spin up the development environment locally

After this I took a look the the jsoplaceholder docs for retrieving posts so I could create my component for calling the endpoint and retrieving the posts.

I created two components to house the posts api data, a simple header component for the title and the main body component which would call the endpoint to get all the posts. Once the body component was added with the detch request added to a useEffect I was ready to display the data within a list. I also began the process of including types by setting up a Post type on Body which had the elements of the api response with the correct types:

`{
  id: number;
  title: string;
  body: string;
}`

From this I was able to create components PostList and PostItem to house the posts info by passing the props down from the Body component.

Next was the search functionality which I acheived by creating a SearchInput component and using a 'query' state which when the input changed would update this state and pass it down to the PostList where I could filter the posts based on the string.

Lastly was the delete functionality where each post could be removed using a delete button. I updated PostItem to have an action which would call deletePost a method defined in the parent PostList, this would take the id of the post as the parameter.

I added the fetch and appropriate REST method to delete the post based on id, and then updated the posts state to filter out the id that had been removed from the array.

Finally I added some very basic styling with scss files to adhere to the design wireframes in the assets folder.

Tests:

I wrote some unit tests with Vitest for the components that I had written these covered mocking the fetch endpoints with mock data to make sure the components correctly displayed the data. The main tests surrounding the functionality was that when the search input was used it filtered correctly and also that the fetch DELETE endpoint was called when the post delete button was pressed.

