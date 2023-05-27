import React from 'react';
import './App.css';
import {NavLink, Outlet, Route, Routes, useNavigate, useParams} from "react-router-dom";

const Music = () => {
    const params = useParams<'id'>()
    const some = params
    console.log(some)
    return <div>Music</div>
}

const User = () => {
    const navigate = useNavigate()

    // при клике на кнопку => переходим на login
    return (
        <div>
            user
            <button onClick={() => {navigate('./login')}}>logout</button>

            {/* если указываем число, например -1 , то при клике перейдем на предыдущую ссылку (на страницу - назад). Могут быть и положительные числа */}
            <button onClick={() => {navigate(-1)}}>-</button>
        </div>
    )
}

const App = () => {

    return (
        <div className="App">
            <NavLink to={'./'}> MAIN </NavLink>
            <NavLink to={'./user'}> USER </NavLink>

            {/* Добавление стиля */}
            <NavLink className={({isActive}) => isActive ? 'ect' : 'def'} to={'./login'}> LOGIN </NavLink>
            <NavLink to={'./profile'}> PROFILE </NavLink>

            {/* вложенность*/}
            <NavLink to={'./profile/setting'}> SETTING </NavLink>


            <NavLink to={'./music'}> MUSIC </NavLink>
            <NavLink to={'./music/1'}> MUSIC/1 </NavLink>



            <Routes>
                <Route path='./*' element={<div>404</div>} />
                <Route path='./' element={<div>main</div>} />
                <Route path='./login' element={<div>login</div>} />
                <Route path='./user' element={<User />} />

                {/* вложенность */}
                {/* при клике на setting будет еще отображаться еще и profile */}
                <Route path='./profile/*' element={(
                    <div>
                        profile
                        <Routes>
                            <Route path='./setting' element={<div>setting</div>} />
                        </Routes>
                    </div>
                )} />

                {/* вложенность 2 */}
                {/* добавляем <Outlet /> на то место куда надо добавить */}
                {/*<Route path={'./profile/*'} element={(<div>profile <Outlet /> </div>)} />*/}
                {/*<Route path={'./setting'} element={<div>setting</div>} />*/}


                <Route path='./profile/:id' element={<Music />} />
                {/*  Тут после слеша говорим, что у нас будет какой-то id  */}
            </Routes>
        </div>
    );
}

export default App;


// -------
// to это вместо href
// NavLink используем, что б страница не перезагружалась

// path={'./*'} path={'./login/*'} добавление звездочки означает, что после нее может быть все что угодно.
// path={'./profile/:id'} - после двоеточия идет параметр.
// все параметры являются строкой, если мы хотим число, то нужно ставить +, что б перевести в number
// если нам надо два параметра path={'./profile/:id:x'}, в типизации уже указываем <id | x> (useParams<'id | x'>())
