import React from 'react';

const problems = [
  {
    pain: "Клиент не дозвонился — ушел к конкурентам",
    solution: "myBOT сам принимает брони 24/7, без звонков и потери клиентов"
  },
  {
    pain: "Люди бронирут но не приходят — день пустует",
    solution: "Автоматические напоминания и подтверждения прямо в Telegram"
  },
  {
    pain: "Не понимаете, сколько реально заработали",
    solution: "myBOT считает всё сам: по датам, беседкам, услугам и гостям"
  },
  {
    pain: "Путаетесь в расписании, двойные брони",
    solution: "myBOT сверяет занятость и не даст записать на то же время"
  },
  {
    pain: "Ваш администратор в плохом настроении может испортить впечатление от всего отдыха",
    solution: "myBOT всегда вежлив и предупредителен. Каждый гость получает одинаково качественный сервис 24/7."
  },
  {
    pain: "Живой администратор забывает предложить гостю баню, мангал или завтрак, теряя вам деньги",
    solution: "myBOT всегда предлагает все допуслуги в момент брони. Ни одна возможность не будет упущена."
  }
];

const ProblemCard: React.FC<{ pain: string; solution: string; index: number }> = ({ pain, solution, index }) => (
  <div 
    className="bg-gray-800/50 border border-white/10 rounded-xl p-6 transform transition-all duration-500 hover:scale-105 hover:bg-white/5 hover:backdrop-blur-md hover:shadow-2xl hover:shadow-primary/20"
    style={{ animation: `slideUp 0.5s ease-out ${index * 0.1}s both` }}
  >
    <h3 className="text-xl font-bold mb-3 flex items-start">
      <span className="text-2xl mr-3">😩</span>
      <span className="text-gray-300">{pain}</span>
    </h3>
    <p className="text-lg text-primary flex items-start">
      <span className="text-2xl mr-3">💡</span>
      <span>
        {solution.startsWith('myBOT') ? (
          <>
            <span className="font-poiret-one">myBOT</span>
            {solution.substring(5)}
          </>
        ) : (
          solution
        )}
      </span>
    </p>
  </div>
);

const Problems: React.FC = () => {
  return (
    <section className="py-20 sm:py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold tracking-tight">Знакомые проблемы?</h2>
          <p className="mt-4 text-lg text-gray-400">Ваш бизнес заслуживает работать как часы.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {problems.map((p, i) => (
            <ProblemCard key={i} pain={p.pain} solution={p.solution} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default React.memo(Problems);