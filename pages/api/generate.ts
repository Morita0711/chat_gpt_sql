import useSharedStore from '../store/index';

const myVariable = useSharedStore.getState().myVariable;

console.log("myVariable=", useSharedStore.getState())

type RequestData = {
  messageText: string;
};


if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing env var from OpenAI");
}

export const config = {
  runtime: "edge",
};

// let prompt = '';
let message_junk = ``;

const handler = async (req: Request) => {
  
  const { messageText } = (await req.json()) as RequestData;

  message_junk += `${messageText} \n` ;

  if (!messageText) {
    return new Response(``, { status: 400 });
  }
  const config = {
    messages: [
      { role: 'system', content: `--
      -- Database: 'example_db'
      --
      
      -- --------------------------------------------------------
      
      --
      -- Table structure for table 'user_details'
      --
      
      CREATE TABLE IF NOT EXISTS 'user_details' (
        'user_id' int(11) NOT NULL AUTO_INCREMENT,
        'username' varchar(255) DEFAULT NULL,
        'first_name' varchar(50) DEFAULT NULL,
        'last_name' varchar(50) DEFAULT NULL,
        'gender' varchar(10) DEFAULT NULL,
        'password' varchar(50) DEFAULT NULL,
        'status' tinyint(10) DEFAULT NULL,
        PRIMARY KEY ('user_id')
      ) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=10001 ;
      
      --
      -- Dumping data for table 'user_details'
      --
      
      INSERT INTO 'user_details' ('user_id', 'username', 'first_name', 'last_name', 'gender', 'password', 'status') VALUES
      (1, 'rogers63', 'david', 'john', 'Female', 'e6a33eee180b07e563d74fee8c2c66b8', 1),
      (2, 'mike28', 'rogers', 'paul', 'Male', '2e7dc6b8a1598f4f75c3eaa47958ee2f', 1),
      (3, 'rivera92', 'david', 'john', 'Male', '1c3a8e03f448d211904161a6f5849b68', 1),
      (4, 'ross95', 'maria', 'sanders', 'Male', '62f0a68a4179c5cdd997189760cbcf18', 1),
      (5, 'paul85', 'morris', 'miller', 'Female', '61bd060b07bddfecccea56a82b850ecf', 1),
      (6, 'smith34', 'daniel', 'michael', 'Female', '7055b3d9f5cb2829c26cd7e0e601cde5', 1),
      (7, 'james84', 'sanders', 'paul', 'Female', 'b7f72d6eb92b45458020748c8d1a3573', 1),
      (8, 'daniel53', 'mark', 'mike', 'Male', '299cbf7171ad1b2967408ed200b4e26c', 1),
      (9, 'brooks80', 'morgan', 'maria', 'Female', 'aa736a35dc15934d67c0a999dccff8f6', 1),
      (10, 'morgan65', 'paul', 'miller', 'Female', 'a28dca31f5aa5792e1cefd1dfd098569', 1);

      


      -
      -- Table structure for table 'user_tall'
      --
      
      CREATE TABLE IF NOT EXISTS 'user_tall' (
        'tId' int(11) NOT NULL AUTO_INCREMENT,
        'uId' varchar(255) DEFAULT NULL,
        'first_name' varchar(50) DEFAULT NULL,
        'last_name' varchar(50) DEFAULT NULL,
        'gender' varchar(10) DEFAULT NULL,
        'password' varchar(50) DEFAULT NULL,
        'status' tinyint(10) DEFAULT NULL,
        PRIMARY KEY ('tId')
      ) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=10001 ;
      
      --
      -- Dumping data for table 'user_tall'
      --
      
      INSERT INTO 'user_tall' ('tId', 'uId', 'tall') VALUES
      (1, 1, 180),
      (2, 2, 210),
      (3, 3, 183),
      (4, 4, 174),
      (5, 5, 186),
      (6, 6, 173),
      (7, 7, 193),
      (8, 8, 189),
      (9, 9, 199),
      (10, 10, 178);
      ` },
      { role: 'user', content: message_junk },
    ],
    model: 'gpt-3.5-turbo'
  };
  
  const data = await fetch("https://api.openai.com/v1/chat/completions", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer '+process.env.OPENAI_API_KEY,
    },
    body: JSON.stringify(config)
  })
  return data;
};

export default handler;
