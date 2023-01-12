# nested-comments-react

This is a simple react library which supports Reddit like nested comments.

<img src="https://raw.githubusercontent.com/Alihussainladiwala/nestedComments/main/nested-comments/resources/libraryGIF.gif" width="250" height="390" />

### Options:

#### Input Parameters:

- **data**: The initial set of comments to be loaded by the component

  - **Format**: `[{parent: AlphaNumeric, child: AlphaNumeric, comment: String, name: String, userId: "Alphanumeric}]`
    - **parentId**: This is the parent Id of the comment. If the comment is the root comment. Its parent Id can be any id.
    - **childId**: This is the actulal id associated with the comment and could be a parent to another comment.
    - **comment**: This is the comment string
    - **name**: Name of the user who commented.
    - **userId**: To uniquely identify user.
    - **color**: Will assign the color to the user icon. If undefined will assign a random color.
  - **Eg:**:`[{parentId: 10, childId: 11, comment: "wassup!", name: "Dark Lord", userId: 1}, {parentId: 11, childId: 12, comment: "Nothing much..:/", name: "Dark Servant", userId: 2}, {parentId: 1, childId: 14, comment: ":)", name: "Dark Master", userId: 3}]`

- **userName**: Name of the logged in user. Through whose account the comments are being made. It is of the type String

- **userId**: UserId of the logged in user. It is Alphanumeric.

- **paginationSize**: The number of comments to be loaded on each click of the _show more_ button. Default value 2. It is an Integer.

> **_NOTE:_** Make sure that all the child id's are unique. Also, they do not contain any special characters.

#### Output Parameters:

- **commentAdded**: This parameter accepts a callback function which is called each time a comment is added and gives the curent comment added along with bunch of other params as shown below.
  - **Format**: `{parentId: AlphaNumeric, childId: AlphaNumeric, comment: String, name: String, userId: Alphanumeric}`
  - **Eg**: `{parentId: 10, childId: 11, comment: "wassup!", name: "Dark Lord", userId: 1}`

### [Link to Demo/Example code](https://codesandbox.io/s/nested-comments-react-wfl2vu?file=/src/App.js "Link to CodeSandbox")

### [Link to Repo](https://github.com/Alihussainladiwala/nestedComments "Link to repo")

Hey! If you found this library helpful make sure to star the repo...:)
