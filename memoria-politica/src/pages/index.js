import Head from 'next/head'
import { TagCloud } from 'react-tagcloud' // esta foi a unica biblioteca de wordclouds que consegui meter a funcionar
// se arranjarem uma melhor aceito


export default function Home() {
  const data = [
    { value: 'JavaScript', count: 38 },
    { value: 'React', count: 30 },
    { value: 'Nodejs', count: 28 },
    { value: 'Express.js', count: 25 },
    { value: 'HTML5', count: 33 },
    { value: 'MongoDB', count: 18 },
    { value: 'CSS3', count: 20 },
    { value: 'Angular', count: 22 },
    { value: 'Vue.js', count: 17 },
    { value: 'Python', count: 27 },
    { value: 'Django', count: 15 },
    { value: 'Flask', count: 12 },
    { value: 'Ruby', count: 8 },
    { value: 'Rails', count: 10 },
    { value: 'PHP', count: 18 },
    { value: 'Laravel', count: 14 },
    { value: 'Symfony', count: 7 },
    { value: 'Java', count: 20 },
    { value: 'Spring', count: 16 },
    { value: 'Hibernate', count: 9 },
    { value: 'C++', count: 14 },
    { value: 'C#', count: 13 },
    { value: 'ASP.NET', count: 11 },
    { value: 'TypeScript', count: 22 },
    { value: 'AngularJS', count: 9 },
    { value: 'Ember.js', count: 7 },
    { value: 'jQuery', count: 16 },
    { value: 'Bootstrap', count: 19 },
    { value: 'SASS', count: 11 },
    { value: 'LESS', count: 7 },
    { value: 'PostgreSQL', count: 13 },
    { value: 'MySQL', count: 15 },
    { value: 'SQLite', count: 7 },
    { value: 'Oracle', count: 6 },
    { value: 'Firebase', count: 8 },
    { value: 'AWS', count: 9 },
    { value: 'Docker', count: 12 },
    { value: 'Kubernetes', count: 7 },
    { value: 'Git', count: 21 },
    { value: 'GitHub', count: 18 },
    { value: 'Bitbucket', count: 6 },
    { value: 'Jenkins', count: 6 },
    { value: 'Travis CI', count: 4 },
    { value: 'CircleCI', count: 3 },
    { value: 'Jest', count: 8 },
    { value: 'Mocha', count: 7 },
    { value: 'Chai', count: 5 },
    { value: 'Selenium', count: 6 },
    { value: 'JIRA', count: 5 },
    { value: 'Trello', count: 7 },
    { value: 'Slack', count: 9 },
    { value: 'Zoom', count: 10 },
    { value: 'VS Code', count: 23 },
    { value: 'Sublime Text', count: 7 },
    { value: 'Atom', count: 6 },
    { value: 'Eclipse', count: 4 },
    { value: 'IntelliJ IDEA', count: 11 },
    { value: 'WebStorm', count: 8 },
    { value: 'Visual Studio', count: 10 },];

  data.forEach(elem => {
    elem.props = {
      title: elem.count, // quando se dá hover aparece o número de ocorrencias
      style: {
        'color': 'white',
        'font-weight': '400',
        'user-select': 'none',
        'cursor': 'pointer',
      },
      className:"opacity-hover"
    };
  })

  return (
    <>
      <Head>
        <title >Memória Política</title>
        <meta name="description" content="Um arquivo das páginas web dos partidos políticos Portugueses." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='mt-5'>
        <div className='flex-col m-auto'>
          <a href='/' className='text-5xl lg:text-7xl font-extrabold inline-block select-none'>Memória Política</a>
          <h3 className='text-2xl mt-0 select-none'>Descriçãozinha mini do projeto, frase impactful.</h3>
          <div className='flex justify-center items-center bg-black h-80 w-100 mt-10'>
            <TagCloud
              style={{ width: '80%', textAlign: 'center' }}
              minSize={7}
              maxSize={50}
              tags={data}
              onClick={tag => alert(`'${tag.value}' was selected!`)}
            />
          </div>
        </div>

      </main>
    </>
  )
}