# BiteSpeed Chatbot Flow Builder

A powerful and extensible chatbot flow builder built with React and React Flow. Create interactive chatbot conversations by connecting message nodes in a visual interface.

## 🚀 Live Demo

**[Live Application](https://bitespeed-seven.vercel.app)** *(Deploy and update this link)*

## ✨ Features

### Core Functionality
- **Visual Flow Builder**: Drag and drop interface for creating chatbot flows
- **Text Message Nodes**: Support for text-based conversation nodes
- **Connection System**: Connect nodes with visual edges to define conversation flow
- **Real-time Editing**: Edit node content with instant preview
- **Flow Validation**: Smart validation to ensure flow integrity before saving

### Technical Features
- **Extensible Architecture**: Easy to add new node types
- **TypeScript Support**: Full type safety throughout the application
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Clean, intuitive interface with smooth animations
- **React Flow Integration**: Built on the powerful React Flow library

### Validation Rules
- Only one node can be the starting point (empty target handle)
- Source handles can only have one outgoing connection
- Target handles can accept multiple incoming connections
- All nodes must have message text before saving

## 🛠️ Tech Stack

- **Frontend**: React 18 with TypeScript
- **Flow Engine**: React Flow v11
- **Styling**: Custom CSS with modern design system
- **Build Tool**: Create React App
- **Deployment**: Vercel/Netlify ready

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/bitespeed-chatbot-flow-builder.git
   cd bitespeed-chatbot-flow-builder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🎯 Usage Guide

### Creating Your First Flow

1. **Add Nodes**: Drag the "Message" node from the left panel onto the canvas
2. **Edit Content**: Click on a node to open the settings panel and edit the message text
3. **Connect Nodes**: Drag from the green circle (source) to the red circle (target) of another node
4. **Save Flow**: Click "Save Changes" when your flow is complete

### Understanding Handles

- **🔴 Red Circle (Top)**: Target handle - receives incoming connections
- **🟢 Green Circle (Bottom)**: Source handle - creates outgoing connections

### Validation

The save button will show errors if:
- More than one node has no incoming connections (multiple starting points)
- Any node has empty message text
- Nodes are completely isolated from the flow

## 🏗️ Architecture

### Project Structure
```
src/
├── components/           # React components
│   ├── TextNode.tsx     # Custom node component
│   ├── NodesPanel.tsx   # Drag-and-drop panel
│   └── SettingsPanel.tsx # Node editing panel
├── config/              # Configuration files
│   └── nodeTypes.ts     # Node type definitions
├── types/               # TypeScript type definitions
│   └── index.ts         # Shared interfaces
├── utils/               # Utility functions
│   └── validation.ts    # Flow validation logic
├── App.tsx              # Main application component
├── index.tsx            # Application entry point
└── index.css            # Global styles
```

### Adding New Node Types

The architecture is designed to be extensible. To add a new node type:

1. **Define the node type** in `src/config/nodeTypes.ts`:
   ```typescript
   imageMessage: {
     type: 'imageMessage',
     label: 'Image',
     description: 'Send an image message',
     icon: '🖼️',
     defaultData: {
       label: 'Send Image',
       imageUrl: '',
       type: 'imageMessage'
     }
   }
   ```

2. **Create the component** in `src/components/ImageNode.tsx`:
   ```typescript
   const ImageNode: React.FC<NodeProps> = ({ data, selected }) => {
     // Component implementation
   };
   ```

3. **Register the component** in `src/App.tsx`:
   ```typescript
   const nodeTypes: NodeTypes = {
     textMessage: TextNode,
     imageMessage: ImageNode, // Add new node type
   };
   ```

## 🚀 Deployment

### Deploy to Vercel

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Build and deploy**
   ```bash
   npm run build
   vercel --prod
   ```

### Deploy to Netlify

1. **Install Netlify CLI**
   ```bash
   npm i -g netlify-cli
   ```

2. **Build and deploy**
   ```bash
   npm run build
   netlify deploy --prod --dir=build
   ```

### Environment Variables

No environment variables are required for basic functionality.

## 🧪 Testing

### Running Tests
```bash
npm test
```

### Manual Testing Checklist

- [ ] Drag and drop nodes from panel
- [ ] Connect nodes with edges
- [ ] Edit node content in settings panel
- [ ] Validate flow before saving
- [ ] Handle connection restrictions
- [ ] Responsive design on mobile


### Coding Standards

- Use TypeScript for all new code
- Follow the existing component structure
- Add comments for complex logic
- Update types when adding new features
- Ensure responsive design

## 📋 Development Notes

### Performance Considerations

- The app uses React Flow's built-in optimizations
- State updates are minimized using useCallback
- Large flows should perform well due to React Flow's virtualization

### Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers for responsive experience
- IE11 not supported (React 18 requirement)

## 🐛 Known Issues

- None currently reported

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React Flow](https://reactflow.dev/) for the excellent flow library
- [React](https://reactjs.org/) team for the amazing framework
- BiteSpeed team for the interesting challenge

## 📞 Contact

- **Developer**: Apoorv Jain
- **Email**: apoorvjain162@gmail.com
- **LinkedIn**: [Your LinkedIn Profile](https://www.linkedin.com/in/apoorv-jain-4487a0145/)

---

**Built with ❤️ for BiteSpeed Frontend Task**
