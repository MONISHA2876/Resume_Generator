import { Download} from 'lucide-react';
import '../../App.css';

function DownloadBtn(){
    const downloadPDF = () => {
        window.print();
    };
        return(
            <button
                onClick={downloadPDF}
                className="w-full bg-[#6A6FFF] hover:bg-[#5056F5] text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
                >
                <Download className="w-5 h-5 mr-2" />
                    Download as PDF
            </button>
        )
}

export default DownloadBtn;