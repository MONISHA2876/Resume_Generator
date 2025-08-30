import { Download } from "lucide-react";

function DownloadBtn({ previewRef }) {
  const handleDownload = () => {
    if (!previewRef.current) return;

    // Use browser's print functionality
    const originalTitle = document.title;
    document.title = "Resume";
    
    // Hide everything except the resume preview
    const body = document.body;
    const allElements = body.children;
    const hiddenElements = [];
    
    // Hide all elements except our preview
    for (let i = 0; i < allElements.length; i++) {
      const el = allElements[i];
      if (!el.contains(previewRef.current)) {
        hiddenElements.push({
          element: el,
          display: el.style.display
        });
        el.style.display = 'none';
      }
    }
    
    // Add print styles
    const printStyle = document.createElement('style');
    printStyle.innerHTML = `
      @media print {
        body {
          margin: 0;
          padding: 0;
          background: white !important;
        }
        
        .resume-preview {
          box-shadow: none !important;
          border: none !important;
          margin: 0 !important;
          padding: 20px !important;
          max-width: none !important;
          width: 100% !important;
        }
        
        /* Hide any buttons or interactive elements during print */
        button {
          display: none !important;
        }
      }
    `;
    document.head.appendChild(printStyle);
    
    // Trigger print dialog
    window.print();
    
    // Cleanup after print dialog closes
    setTimeout(() => {
      // Restore hidden elements
      hiddenElements.forEach(({ element, display }) => {
        element.style.display = display;
      });
      
      // Remove print styles
      document.head.removeChild(printStyle);
      document.title = originalTitle;
    }, 1000);
  };

  return (
    <button
      onClick={handleDownload}
      className="w-full bg-[#6A6FFF] hover:bg-[#5056F5] text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
    >
      <Download className="w-5 h-5 mr-2" />
      Save as PDF
    </button>
  );
}

export default DownloadBtn;