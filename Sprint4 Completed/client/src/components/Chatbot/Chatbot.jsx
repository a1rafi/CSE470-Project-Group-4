// import React from "react";
// import ChatBot from "react-chatbotify";

// //import classes from './Chatbot.css';

// const helpOptions = ["Search", "Home", "About", "Profile"];
// 	const flow = {
// 		start: {
// 			message: "Hello dear customer👋! Welcome to AirBnB, how can I help you? " +
// 				" 😊!",
// 			transition: {duration: 1000},
// 			path: "show_options"       
// 		},                  
// 		show_options: {
// 			message: "It looks like you have not set up a conversation flow yet. No worries! Here are a few helpful " +
// 				"things you can check out to get started:",
// 			options: helpOptions,
// 			path: "process_options"
// 		},
// 		prompt_again: {
// 			message: "Do you need any other help?",
// 			options: helpOptions,
// 			path: "process_options"
// 		},
// 		unknown_input: {
// 			message: "Sorry, I do not understand your message 😢! If you require further assistance, you may click on " +
// 				"one the Home option and open an issue there or visit our discord.",
// 			options: helpOptions,
// 			path: "process_options"
// 		},
// 		process_options: {
// 			transition: {duration: 0},
// 			chatDisabled: true,
// 			path: async (params) => {
// 				let link = "";
// 				switch (params.userInput) {
// 				case "Search":
// 					link = "http://localhost:5173/search";
// 					break;
// 				case "Home":
// 					link = "http://localhost:5173/";
// 					break;
// 				case "About":
// 					link = "http://localhost:5173/about";
// 					break;
// 				case "Profile":
// 					link = "http://localhost:5173/profile";
// 					break;
// 				default:
// 					return "unknown_input";
// 				}
// 				await params.injectMessage("Sit tight! I'll send you right there!");
// 				setTimeout(() => {
// 					window.open(link);
// 				}, 1000)
// 				return "repeat"
// 			},
// 		},
// 		repeat: {
// 			transition: {duration: 3000},
// 			path: "prompt_again"
// 		},
// 	}

// const MyChatBot = () => {
//   return (
//     <ChatBot options={{ theme: { embedded: true }, chatHistory: { storageKey: "example_faq_bot" } }} flow={flow} />
//   );
// };

// const Chatbot = () => {
//   const [isOpen, setIsOpen] = React.useState(false);

//   const toggleChatbot = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <div>
//       <button onClick={toggleChatbot}>AirBnB Chatbot</button>
//       {isOpen && (
//         <div style={{ position: "fixed", bottom: 20, right: 20, zIndex: 9999 }}>
//           <MyChatBot />
//         </div>
//       )}
//     </div>
//   );
// };
			


// export default Chatbot;

import React from "react";
import ChatBot from "react-chatbotify";

const helpOptions = ["Search", "Home", "About", "Profile"];
const flow = {
  start: {
    message: "Hello dear customer👋! Welcome to AirBnB, how can I help you? " +
      " 😊!",
    transition: { duration: 1000 },
    path: "show_options"
  },
  show_options: {
    message: "It looks like you have not set up a conversation flow yet. No worries! Here are a few helpful " +
      "things you can check out to get started:",
    options: helpOptions,
    path: "process_options"
  },
  prompt_again: {
    message: "Do you need any other help?",
    options: helpOptions,
    path: "process_options"
  },
  unknown_input: {
    message: "Sorry, I do not understand your message 😢! If you require further assistance, you may click on " +
      "one the Home option and open an issue there or visit our discord.",
    options: helpOptions,
    path: "process_options"
  },
  process_options: {
    transition: { duration: 0 },
    chatDisabled: true,
    path: async (params) => {
      let link = "";
      switch (params.userInput) {
        case "Search":
          link = "http://localhost:5173/search";
          break;
        case "Home":
          link = "http://localhost:5173/";
          break;
        case "About":
          link = "http://localhost:5173/about";
          break;
        case "Profile":
          link = "http://localhost:5173/profile";
          break;
        default:
          return "unknown_input";
      }
      await params.injectMessage("Sit tight! I'll send you right there!");
      setTimeout(() => {
        window.location.href = link;
      }, 1000)
      return "repeat"
    },
  },
  repeat: {
    transition: { duration: 3000 },
    path: "prompt_again"
  },
}

const MyChatBot = () => {
  return (
    <ChatBot options={{ theme: { embedded: true }, chatHistory: { storageKey: "example_faq_bot" } }} flow={flow} />
  );
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded" onClick={toggleChatbot}>AirBnB Chatbot</button>
      {isOpen && (
        <div className="fixed bottom-10 right-0 z-50 w-96 bg-white border border-gray-300 rounded-tl-2xl shadow-lg">
          <MyChatBot />
        </div>
      )}
    </div>
  );
};

export default Chatbot;
