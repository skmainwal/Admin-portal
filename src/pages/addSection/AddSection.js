import React, { useState, useEffect } from "react";
import Section from "../../components/Section/Section";
import { selectedQuestionTypeFun } from "../../store/action";
import { useSelector, useDispatch } from "react-redux";
import styles from "./AddSection.module.css";
const AddSection = () => {
  const dispatch = useDispatch();
  const reduxState = useSelector((state) => state);
  const [cancerTypes, setCancerTypes] = useState([]);
  const [languageTypes, setLanguageTypes] = useState([]);
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
    dispatch(selectedQuestionTypeFun(null));
  }, []);

  return (
    <div className={styles.add_section}>
      <Section cancerTypes={cancerTypes} languageTypes={languageTypes} />
    </div>
  );
};

export default AddSection;
