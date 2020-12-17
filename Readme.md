# Hello better - Coding Challenge

This assignment is made with love by Shikhar Varshney in response to the coding challenge facilitated by Hello better.

### Prerequisites

What things you need to install the software and how to install them

```

Software	          Version
Android studio (IDE)	>= 2.2.3
Android Sdk	        >= 25.0.2
Java	                >= 1.8.0_121
Node Js	                >= 8.0
NPM	                >= 6.0.0
React native cli        2.0.1
Cocoapods               Install the latest one
Homebrew                Install the latest one
XCode                   >= 11.0
Yarn                    latest version is preferable
Any Editor of your      Latest Version
Choice. Preferably 
VSCode
```

## What all is there in this Project?

1. It is on latest ```React Native version 0.63.4``` in which autolinking is supported.
2. ```Basic Navigation stack``` using React navigation v5 is implemented in here.
3. ```Linting rules``` has already been defined as per latest ```React native community guidelines```. Install Prettier in your VSCode and set the rules defined in .eslintrc file.
4. All the management of Code Structure, Folder Structure, Design Pattern, Fonts, Images have been properly managed in the project. Just follow the best practices and you will never have to worry about anything else.
5. All the basic components like Buttons, App navigation bar, Response type picker, etc are made as Reusable components so that they can be used independently in the project to maintain consistency. You can also tweak them as per your need.
6. ```Realm is used ``` in here to store the various types of media responses given by the user so that the record remains intact.
7. Folder Structure is designed using a tree structure:-

    src
     |--- ```Components (Reusable components)```

     |--- ```Database (Record Models and reading and writing fucntions)```

     |--- ```Screens -> All the UI rendering of screens.```

     |--- ```Utils -> Supporting code like constants, strings etc.```

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.



### Installing

```
Step 1:-
```
Clone the Github Repo either by using HTTPS or SSH onto your local machine using the command "git clone". The master branch will be cloned to your project.

```
Step 2:- 
```
Checkout the branch ```master``` using the command ```git checkout <branch-name>```.

```
Step 3:- 
```
cd into the root directory of the project and do ```yarn install```.

```
Step 4:- 
```
cd ios and the type the command ```pod install```.

```
Step 5:- 
```
Either open the project in respective IDEs like XCode (<project-name>.xcworkspace file) or Android Studio(android folder) and run the project from there only OR run the following commands ```react-native run-ios``` or ```react-native run-android``` from your terminal window from the root directory of your project to start the project.

## Common Pitfalls and Errors while Installing the Project and how to solve them.

I have tried my level best that by following the above steps you can directly get the project running without any hustle. However there may be some probable issues while trying to run the project based on the individual system configs. Here are possible scenarios and how to remove them.

1. Facing issues regarding ```yarn install```:- Please check that if `node` and ```Homebrew``` are installed in your system or not. If not, then please install them first.
2. Pods not getting installed or Cocoapods version is an older one:- Please install Cocoapods first and if it is present then update it to latest version.
3. Some error with Pods:- Please remove the `Pods Folder` and `podfile.lock` from the `ios` directory either manually or by typing these commands from terminal ```rm -rf Pods && rm -rf podfile.lock``` and then perform a fresh `pod install`.
4. If there is a error regarding starting the metro bundler due to javascript and node version mismatch:- Please run this following command ```watchman watch-del-all && react-native start --reset-cache```.
5. If ```watchman``` is not installed then please install it first by typing the following command ```brew install watchman```.
6. If there is some problem with integrating Realm in iOS, then please disintegrate pods by using this command ```pod deintegrate``` and then install the pods again by using ```pod install```
    
## Contributors
* **Shikhar Varshney**

## Acknowledgments
* **Amit Gupta**
* **Florence**


