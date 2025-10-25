

// const App = () => {

//   return (
//     // <QueryClientProvider client={QueryClient}>
//     //   <TooltipProvider>
//         {/* Toast notification systems */}
//         {/* <Toaster /> */}
//         {/* <Sonner /> */}

//         {/* Routing system */}
        
//         // <BrowserRouter>
//           {/* <Routes> */}
//             {/* Landing + Auth */}
//             {/* <Route path="/" element={<Landing />} /> */}
//             {/* <Route path="/auth" element={<Auth />} /> */}

//             {/* Dashboard pages */}
//             {/* <Route path="/dashboard" element={<Dashboard />} />
//             <Route path="/products" element={<Products />} />
//             <Route path="/collections" element={<Collections />} /> */}

//             {/* Tag-based routes */}
//             {/* <Route path="/tags/just-in" element={<JustIn />} />
//             <Route path="/tags/best-seller" element={<BestSeller />} />
//             <Route path="/tags/limited-units" element={<LimitedUnits />} /> */}
//             {/* <Route path="/tags/misspelt" element={<MisspeltTags />} /> */}
//             {/* <Route path="/tags/ai-tags" element={<AITags />} /> */}

//             {/* Admin & Misc */}
//             {/* <Route path="/admin" element={<AdminPanel />} />
//             <Route path="/pricing" element={<Pricing />} />
//             <Route path="/contact" element={<Contact />} /> */}

//             {/* 404 Fallback */}
//             {/* <Route path="*" element={<NotFound />} /> */}
//           {/* </Routes> */}
//           {/* <Navbar/> */}
     
//      {/* <Footer /> */}
//         {/* </BrowserRouter> */}
        
//        {/* </TooltipProvider>
//      </QueryClientProvider> */}
//   )
// }







import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
// import Footer from './components/Footer'
// import Navbar from './components/Navbar'
import Landing from './pages/Landing'
import Pricing from './pages/Pricing'
import JustIn from './pages/tags/JustIn'
import LimitedUnits from './pages/tags/LimitedUnits'
import BestSeller from './pages/tags/BestSeller'
import AiTags from './pages/tags/AiTags'
import Misspelt from './pages/tags/Misspelt'
// import Sidebar from './components/Sidebar'
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard'
import Auth from './pages/Auth'
import NotFound from './pages/NotFound'
import AdminPanel from './pages/Setting'
import Collections from './pages/Collections'
import Products from './pages/Products'
// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sooner } from './components/ui/sonner'


function App() {

  return (
    <>

    {/* <Toaster/> */}
    {/* <Sooner/> */}
      {/* <BrowserRouter> */}
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/tags/just-in" element={<JustIn />} />
          <Route path="/tags/best-seller" element={<BestSeller />} />
          <Route path="/tags/limited-units" element={<LimitedUnits />} />
          <Route path="/tags/mis-spelt" element={<Misspelt />} />
          <Route path="/tags/ai-tags" element={<AiTags />} />
          <Route path="/setting" element={<AdminPanel />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      {/* </BrowserRouter> */}
    {/* <Sidebar/>
     <Navbar/>
      <Footer />
      <Landing/>
     <Pricing/>
     <JustIn/>
     <BestSeller/>
     <LimitedUnits/>
     <AiTags/>
     <Misspelt/>
     <Contact/>
     <Dashboard/>
     <Auth/> */}
    </>
  )
}

export default App;

