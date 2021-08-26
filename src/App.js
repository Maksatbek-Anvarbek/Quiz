import './App.css';
import { Route , Switch } from 'react-router-dom'
import Layout from "./HOC/Layout/Layout";
import Quiz from "./conteiners/quiz/quiz";
import QuizList from "./conteiners/QuizList/QuizList";
import QuizCreator from "./conteiners/QuizCreator/QuizCreator";
import Auth from "./conteiners/Auth/Auth";

function App() {
  return (
   <Layout>
    <Switch>
        <Route path='/' exact component={QuizList} />
        <Route path='/quiz-creator' exact component={QuizCreator} />
        <Route path='/quiz/:id' exact component={Quiz} />
        <Route path='/auth' exact component={Auth} />
    </Switch>
   </Layout>
  );
}

export default App;
