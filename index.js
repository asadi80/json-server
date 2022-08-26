const Api = (() => {
    const baseUrl = 'http://localhost:4232';
    const courseList = 'courseList';
  
    const getCourse = () =>
      fetch([baseUrl, courseList].join('/')).then((response) => response.json());
  
    return {
      getCourse
      
    };
  })();

  const View = (() => {
    let ele=document.querySelector('.all-courses')
    const render = (tmp) => {
      ele.innerHTML = tmp;
    };
    const createTmp = (arr) => {
        let tmp = '';
        arr.forEach((courses) => {
          tmp += `
            <li>
              <p>${courses.courseId}-${courses.courseName}</p>
              <p>${courses.credit}</p>
              <br
            </li>
          `;
        });
        return tmp;
      }
        return {
          render,
          createTmp,
        };
  })();
  
 //-----------------------------------------------------------------------


 const Model = ((api) => {
    const {getCourse} = api
    return{
        getCourse
    }
    
    })(Api)


//-----------------------------------------------------------------------

const controller = ((model, view) => {
    
    const init = () => {
        model.getCourse().then( course =>{
        const tmp = view.createTmp(course);
        view.render(tmp)
        })
    }
    return{
        init
        }
})(Model, View)
controller.init()