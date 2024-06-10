import { Route, Routes } from 'react-router-dom';

import { Home } from './pages/Home';

function App() {
	return (
		<>
			<div className='wrapper'>
				<Routes>
					<Route path='/' element={<Home />}></Route>
				</Routes>
			</div>
		</>
	);
}

export default App;
