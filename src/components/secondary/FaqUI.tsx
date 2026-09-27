import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowIcon from "../../../public/svgs/arrow2-icon.svg"
import { FC, useState } from "react";
import { SxProps, Theme } from "@mui/material";


export const faqsData = [
  {
    question: "What is Durekt",
    answer:
      "Durekt is an AI-powered software platform designed to help sales teams optimize performance. It analyzes sales call interactions, grades skills, and provides real-time feedback to improve communication, engagement, and overall sales effectiveness.",
  },
  {
    question:
      "How does Durekt analyze sales calls?",
    answer:
      "Durekt uses advanced AI algorithms to analyze various aspects of a sales call, including tone, clarity, engagement, and adherence to best sales practices. It then grades the performance of each skill set based on predefined criteria to help identify areas for improvement.",
  },
  {
    question:
      "How is the data transmitted to the backend dashboard?",
    answer:
      "Once the sales call is analyzed, the data is securely transmitted to Durekt’s backend dashboard via encrypted transmission protocols. This ensures that performance data is both safe and readily accessible for review and analysis by sales leaders.",
  },
  {
    question: "Can Durekt help with sales forecasting?",
    answer:
      "Yes! Durekt provides historical performance data and predictive analytics, allowing sales leaders to forecast sales outcomes with greater accuracy. The system analyzes trends in individual and team performance to predict future sales success and guide planning.",
  },
  {
    question:
      "Is Durekt easy to integrate with existing sales tools?",
    answer:
      "Yes, Durekt is designed to integrate smoothly with your existing sales tools and CRM platforms. Our system can work alongside your current workflow, providing seamless analysis without disrupting daily operations.",
  },
  {
    question:
      "How secure is Durekt’s data?",
    answer:
      "Durekt prioritizes the security of your data. All information is transmitted through secure, encrypted channels, and we comply with industry standards to ensure that your data is protected at all times.",
  },
  {
    question:
      "Can Durekt be customized for my team’s specific needs?",
    answer:
      "Yes, Durekt can be customized to align with your team’s specific sales processes and goals. We can adjust the grading criteria, reporting format, and dashboard settings to meet your unique requirements, ensuring that the platform supports your objectives.",
  },
  {
    question:
      "Does Durekt work for all types of sales teams?",
    answer:
      "Yes, Durekt is designed to support sales teams across various industries, from B2B to B2C, and can be adapted for both small sales teams and large enterprises. Whether you're in tech, retail, finance, or any other field, Durekt provides valuable insights into sales performance.",
  },
  {
    question:
      "Can I try Durekt before committing?",
    answer:
      "Absolutely! We offer a free trial so you can explore all the features of Durekt and see how it works for your team before making any long-term commitments. Start your free trial today to experience the benefits firsthand.",
  },
  {
    question:
      "Does Durekt provide any insights for individual sales reps?",
    answer:
      "Yes, Durekt gives each sales rep detailed insights into their performance. Reps can see their strengths and areas for improvement, helping them take control of their own development and accelerate their growth with targeted self-improvement.",
  },

];

interface props {
    className?: string
    detailsClassName?: string
    containerStyle?: SxProps<Theme> | undefined,
    headerStyle?: SxProps<Theme> | undefined,
    detailsStyle?: SxProps<Theme> | undefined,
    headerClassName?: string,
    searchTerm?: string,
    viewAll?: boolean
}

const FaqUI:FC<props> = ({className, containerStyle, searchTerm = "", viewAll, detailsClassName, headerClassName}) => {
    const [showMore, setShowMore] = useState(false);
    const [visible, setVisible] = useState(viewAll ? faqsData?.length : 5);

    const filterData = faqsData.filter(item => item.question.toLowerCase().includes(searchTerm.toLowerCase()))

    return (
        <>
            {filterData.slice(0, visible).map((faq, index) => {
            return (
              <Accordion sx={containerStyle} key={index} className={` py-1 z-[2] px-2  ${className ? className : "bg-[#00000099] mt-[5px] border-b border-b-[#C32782] text-[#DBDBDB]"}`}>
                <AccordionSummary
                  expandIcon={
                    <ArrowIcon className="rotate-[90deg] text-[#DBDBDB]" />
                  }
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <p
                    className={` ${headerClassName ? headerClassName : "text-[14px] sm:text-[16px]"}`}
                  >
                    {faq.question}
                  </p>
                </AccordionSummary>
                <AccordionDetails>
                  <p
                    className={` ${detailsClassName ? detailsClassName : "text-[#FFFFFF] text-[13px] sm:text-[16px]"}`}
                  >
                    {faq.answer}
                  </p>
                </AccordionDetails>
              </Accordion>
            );
          })}
          {/* <div className="w-[330px] bg-rose-500 flex items-center justify-center ">
            <button
              onClick={() => {
                setShowMore(!showMore);
                !showMore ? setVisible(faqsData.length) : setVisible(4);
              }}
              className="text-[#087E18] flex items-center justify-center font-[600] transition-transform duration-200 delay-200  "
            >
              {!showMore ? `Show All (${faqsData.length})` : "Show Less"}
              <ArrowIcon className={`${showMore ? "text-[#585858] transition-transform transform rotate-[280deg] ease-out" : "text-[#585858]"} rotate-[90deg]`} />
            </button>
          </div> */}
        </>
    )
}

export default FaqUI