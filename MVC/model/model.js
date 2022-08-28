import { Api } from "../api/api.js";
import { View } from "../view/view.js";


export const Model = ((api, view) => {
    const { getCourses, deleteCourse } = api;
  
    class Course {
      constructor(courseId, courseName, required, credit) {
        this.courseId = courseId;
        this.courseName = courseName;
        this.courseRequired = required;
        this.courseCredit = credit;
      }
    }
  
    class State {
      #allcourses = [];
      #totalcredit = 0;
      #emptCourses = [];
      #selectedCourses = [];
      
  
      get allcourses() {
        return this.#allcourses;
      }
  
      
      get selectedCourses() {
          return this.#selectedCourses;
        }
        
        get emptCourses() {
            return this.#emptCourses;
        }
  //----------create and render all courses
      set allcourses(newlist) {
        this.#allcourses = [...newlist];
  
        const allcourses = document.querySelector(
          view.domstr.allcourses
        );
       
        const templet = view.createTmp(this.#allcourses);
        view.render(allcourses, templet);
      }
    //----------create and render all selected courses
      setSelectedCourses(newlist) {
        this.#selectedCourses = [...newlist];
        
        const selectedContainer = document.querySelector(
          view.domstr.selectedCourses
        );
        const templet = view.createTmpSelected(this.#selectedCourses);
        view.render(selectedContainer, templet);
      }
  
      setemptCourses(newlist) {
        this.#emptCourses = [...newlist];
      }
  
      setTotalcredit(credit) {
        this.#totalcredit = credit;
        const creditText = document.querySelector(view.domstr.totalcredit);
  
        view.render(creditText, this.#totalcredit);
      }
  
      setElementBackground(ele, selected) {
        view.background(ele, selected);
      }
    }
  
    return { getCourses, deleteCourse, State, Course };
  })(Api, View);