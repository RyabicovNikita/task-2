import { useState } from 'react';
import styles from './app.module.css';
import data from './data.json';

export const App = () => {
	const [steps, addNewStep] = useState(data);
	const [activeIndex, setActiveIndex] = useState(0);
	function onForwardButtonClick() {
		setActiveIndex(curIndex => curIndex + 1);
	}
	function onBackButtonClick() {
		setActiveIndex(curIndex => curIndex - 1);
	}
	function onBeginStartButtonClick() {
		setActiveIndex(0);
	}

	function onStepClick(index) {
		setActiveIndex(index);
	}

	let isFirstStep = activeIndex === 0;
	let isLastStep = activeIndex === steps.length-1;

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<h1>Инструкция по готовке пельменей</h1>
				<div className={styles.steps}>
					<div className={styles['steps-content']}>
						{steps[activeIndex].content}
					</div>
					<ul className={styles['steps-list']}>
						{steps.map((step, index) => 
							<li key={step.id} className={[styles['steps-item'], styles.done, index === activeIndex ? styles.active : ''].join(' ')}>
								<button className={[styles['steps-item-button'], index > activeIndex && styles.inactive].join(' ')} onClick={() => onStepClick(index)}>{index + 1}</button>
								{step.title}
							</li>
						)}
					</ul>
					<div className={styles['buttons-container']}>
						<button className={styles.button} disabled={isFirstStep} onClick={onBackButtonClick}>Назад</button>
						<button className={styles.button} onClick={isLastStep ? onBeginStartButtonClick : onForwardButtonClick}>
							{isLastStep ? 'Начать сначала' : 'Далее'}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
