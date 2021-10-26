import React, { useState, useEffect } from "react";
import Wrapper from "../../components/Wrapper/Wrapper";
import { useSelector } from "react-redux";
import { getSectionList } from "../../api_requests/ApiRequests";
import styles from "./UpdateSection.module.css";
import ShowQuestionList from "../../components/UI/ShowQuestionList";
import Section from "../../components/Section/Section";
import Question from "../../components/UI/Question";
const UpdateSection = () => {
  // const [selectedQuestionId, setSelectedQuestionId] = useState(null);
  // const [selectedLanguage, setSelectedLanguage] = useState(null);

  const [selectedCancerAndLanguage, setSelectedCancerAndLanguage] = useState({
    cancer_type: "",
    language_type: "",
  });
  const [isSaveButtonClicked, setIsSaveButtonClicked] = useState(false);

  console.log("isSaveButtonClicked", isSaveButtonClicked);

  const [cancerTypes, setCancerTypes] = useState([]);
  const [languageTypes, setLanguageTypes] = useState([]);
  const [sectionList, setSectionList] = useState([]);
  const [questionDetail, setQuestionDetail] = useState(null);
  console.log("questionDetail", questionDetail);
  const reduxState = useSelector((state) => state);
  useEffect(() => {
    let Language = reduxState.inLanguage.map((langType) => {
      return {
        ID: langType.short_name,
        Name: langType.language_type,
        Category: langType.language_type,
      };
    });

    let CancerTypes = reduxState.cancerTypes.map((cancer) => {
      return {
        ID: cancer.short_name,
        Name: cancer.cancer_type,
        Category: cancer.cancer_type,
      };
    });
    setCancerTypes(CancerTypes);
    setLanguageTypes(Language);
  }, []);

  const dropDownHandler = (Id, value) => {
    console.log(Id, value);
  };

  useEffect(async () => {
    if (isSaveButtonClicked) {
      const { cancer_type, language_type } = selectedCancerAndLanguage;
      let response = await getSectionList(
        cancer_type,
        language_type
        // ErrorHandler
      );
      if (response.length > 0) {
        setSectionList(response);
      } else {
        setSectionList([]);
      }
      setIsSaveButtonClicked(false);
    }
  }, [isSaveButtonClicked]);

  return (
    <Wrapper
      cancerTypes={cancerTypes}
      languageTypes={languageTypes}
      onChangeHandler={dropDownHandler}
      questionListHandler={(data) => setSectionList([...data])}
      setSelectedCancerAndLanguage={(data) =>
        setSelectedCancerAndLanguage(data)
      }
    >
      <div className={styles.updateSection}>
        <div className={styles.section_list}>
          {sectionList.length != 0 && (
            <ShowQuestionList
              sectionList={sectionList}
              questionListHandler={(data) => setSectionList(data)}
              setQuestionDetail={(data) => setQuestionDetail(data)}
              // setSelectedQuestionId={(value) => setSelectedQuestionId(value)}
            />
          )}
        </div>
        <div className={styles.section_details}>
          <Section
            cancerTypes={cancerTypes}
            languageTypes={languageTypes}
            questionDetail={questionDetail}
            setIsSaveButtonClicked={(val) => setIsSaveButtonClicked(val)}
          />
        </div>
      </div>
    </Wrapper>
  );
};

export default UpdateSection;
