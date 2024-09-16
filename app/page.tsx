import { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Logo de proyectos
import copsneak from 'public/images/projects/copsneak.png';
import vec from 'public/images/projects/vec.png';
import wordartly from 'public/images/projects/wordartly.png';
import cwf from 'public/images/projects/cwf.png';
import flyconnects from 'public/images/projects/flyconnects.png';
import snap89 from 'public/images/projects/snap89.png';

// Galeria de imagenes
import duquesa from 'public/images/home/duquesa.jpg';
import flexing from 'public/images/home/flexing.jpg';
import flexing2 from 'public/images/home/flexing2.jpg';
import gorras2 from 'public/images/home/gorras2.jpg';
import hiking from 'public/images/home/hiking.jpg';
import duquesa2 from 'public/images/home/duquesa2.jpg';

import ViewCounter from 'app/blog/view-counter';
import { PreloadResources } from 'app/preload';
import {
  getViewsCount,
} from 'app/db/queries';

function Badge(props) {
  return (
    <a
      {...props}
      target="_blank"
      className="inline-flex items-center gap-2 rounded border border-neutral-200 bg-neutral-50 p-1 text-sm leading-4 text-neutral-900 no-underline dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
    />
  );
}

function ArrowIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ChannelLink({ img, link, name }) {
  return (
    <div className="group flex w-full">
      <a
        href={link}
        target="_blank"
        className="flex w-full items-center justify-between rounded border border-neutral-200 bg-neutral-50 px-3 py-4 dark:border-neutral-700 dark:bg-neutral-800"
      >
        <div className="flex items-center space-x-3">
          <div className="relative h-16">
            <Image
              alt={name}
              src={img}
              height={64}
              width={64}
              sizes="33vw"
              className="h-16 w-16 rounded-full border border-neutral-200 dark:border-neutral-700"
              priority
            />

          </div>
          <div className="flex flex-col">
            <p className="font-medium text-neutral-900 dark:text-neutral-100">
              {name}
            </p>
            <span className="text-sm text-neutral-600 dark:text-neutral-300">
              {link.replace('https://', '')}
            </span>
          </div>
        </div>
        <div className="transform text-neutral-700 transition-transform duration-300 group-hover:-rotate-12 dark:text-neutral-300">
          <ArrowIcon />
        </div>
      </a>
    </div>
  );
}

function BlogLink({ slug, name }) {
  return (
    <div className="group">
      <a
        href={`/blog/${slug}`}
        className="flex w-full items-center justify-between rounded border border-neutral-200 bg-neutral-50 px-3 py-4 dark:border-neutral-700 dark:bg-neutral-800"
      >
        <div className="flex flex-col">
          <p className="font-medium text-neutral-900 dark:text-neutral-100">
            {name}
          </p>
          <Suspense fallback={<p className="h-6" />}>
            <Views slug={slug} />
          </Suspense>
        </div>
        <div className="transform text-neutral-700 transition-transform duration-300 group-hover:-rotate-12 dark:text-neutral-300">
          <ArrowIcon />
        </div>
      </a>
    </div>
  );
}

async function Views({ slug }: { slug: string }) {
  let views = await getViewsCount();
  return <ViewCounter allViews={views} slug={slug} />;
}

export default async function Page() {
  const apiKey = process.env.STOCKS_API_KEY;
  const symbols = ['MSFT', 'NVDA'];
  const responses = await Promise.all(
    symbols.map(symbol =>
      fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey}`)
    )
  );

  const data = await Promise.all(responses.map(res => res.json()));
  const prices = data.reduce((acc, stockData) => {
    const symbol = stockData["Meta Data"]?.["2. Symbol"];
    if (symbol && stockData["Time Series (Daily)"]) {
      const latestDate = Object.keys(stockData["Time Series (Daily)"])[0];
      acc[symbol] = parseFloat(stockData["Time Series (Daily)"][latestDate]["4. close"]);
    }
    return acc;
  }, {});

  console.log(prices)

  return (
    <section>
      <PreloadResources />
      <h1 className="mb-8 text-2xl font-medium tracking-tighter">
        hey, I'm Marc 👋
      </h1>
      <p className="prose prose-neutral dark:prose-invert text-justify">
        {`Hi! I'm Marc, I started programming at the age of 14, out of curiosity, and when I was 16, I sold my first small SaaS company `}

        <span className="not-prose">
          <Badge href="https://copsneakmonitor.com/">
            <img src="/copsneak.png" alt="Copsneak" className="h-4" />
            Copsneak Monitors
          </Badge>
        </span>

        {`. So far, I've been creating small projects like `}

        {/* WORDARTLY */}
        <span className="not-prose">
          <Badge href="https://wordarlty.archives.marcsnv.com/">
            <img src="images/projects/wordartly.png" alt="WordArtly Archive" className="h-4" />
            WordArtly
          </Badge>
        </span>

        {`, an AI-powered image generation platform, `}

        {/* VEC */}
        <span className="not-prose">
          <Badge href="https://vitaleatsclub.com/">
            <img src="images/projects/vec.png" alt="VEC" className="h-4" />
            Vital Eats Club
          </Badge>
        </span>

        {`, an AI-powered recipe newsletter, `}

        {/* SNAP89 */}
        <span className="not-prose">
          <Badge href="https://snap89.com/">
            <img src="/s89.png" alt="Snap 89" className="h-4" />
            Snap 89
          </Badge>
        </span>

        {`, a personal cap brand, and a few more! Here you can see a list of the projects`}
      </p>
      <div className="my-8 columns-2 gap-4 sm:columns-3">
        <div className="relative mb-4 h-40">
          <Image
            alt="Me speaking on stage at React Summit about the future of Next.js"
            src={duquesa}
            fill
            sizes="(max-width: 768px) 213px, 33vw"
            priority
            className="rounded-lg object-cover"
          />
        </div>
        <div className="relative mb-4 h-80 sm:mb-0">
          <Image
            alt="Me, Lydia, and Delba filming the Next.js Conf keynote"
            src={flexing}
            fill
            sizes="(max-width: 768px) 213px, 33vw"
            priority
            className="rounded-lg object-cover object-[-16px] sm:object-center"
          />
        </div>
        <div className="relative h-40 sm:mb-4 sm:h-80">
          <Image
            alt="Me standing on stage at Reactathon delivering the keynote"
            src={hiking}
            fill
            sizes="(max-width: 768px) 213px, 33vw"
            priority
            className="rounded-lg object-cover object-top sm:object-center"
          />
        </div>
        <div className="relative mb-4 h-40 sm:mb-0">
          <Image
            alt="Me standing on stage at SmashingConf giving a talk about my optimism for the web"
            src={duquesa2}
            fill
            sizes="(max-width: 768px) 213px, 33vw"
            priority
            className="rounded-lg object-cover"
          />
        </div>
        <div className="relative mb-4 h-40">
          <Image
            alt="Me and Guillermo Rauch on stage for Vercel Ship, answering questions from the Next.js community"
            src={gorras2}
            fill
            sizes="(max-width: 768px) 213px, 33vw"
            priority
            className="rounded-lg object-cover"
          />
        </div>
        <div className="relative h-80">
          <Image
            alt="My badge on top of a pile of badges from a Vercel meetup we held"
            src={flexing2}
            fill
            sizes="(min-width: 768px) 213px, 33vw"
            priority
            className="rounded-lg object-cover"
          />
        </div>
      </div>
      <div className="prose prose-neutral dark:prose-invert">
        <p className='text-justify'>
          Thanks to this, I have been invited to young entrepreneur events in Spain, where I have been able to meet incredible people in the entrepreneurship and investment sector.
          <br />
          <br />
          Since all my projects so far have been solopreneurs, or with subcontractors, I would like to discover business as a team, work hand in hand with other people, share ideas, etc. Since it is something that I would like to reinforce in myself.
        </p>
      </div>
      <div className="my-8 flex w-full flex-col space-x-0 space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
        <ChannelLink
          img={copsneak}
          name="Copsneak Monitors"
          link="https://copsneakmonitor.com"
        />
        <ChannelLink
          img={vec}
          name="Vital Eats Club"
          link="https://vitaleatsclub.com"
        />
      </div>
      <div className="my-8 flex w-full flex-col space-x-0 space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
        <ChannelLink
          img={wordartly}
          name="Wordartly (Archive)"
          link="https://wordartly.com"
        />
        <ChannelLink
          img={cwf}
          name="Cafewofi"
          link="https://cafewofi.com"
        />
      </div>
      <div className="my-8 flex w-full flex-col space-x-0 space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
        <ChannelLink
          img={flyconnects}
          name="Fly Connects (Archive)"
          link="https://flyconnects.com"
        />
        <ChannelLink
          img={snap89}
          name="Snap 89"
          link="https://snap89.com"
        />
      </div>
      <div className="prose prose-neutral dark:prose-invert">
        <p className='text-justify'>
          In this little blog I will publish some things about my work and hobbies.
        </p>
      </div>
      <div className="my-8 flex w-full flex-col space-y-4">
        <BlogLink
          name="How to create an LLC outside the USA"
          slug="create-an-llc-outside-the-usa"
        />
        <BlogLink
          name="The two faces of young businesses"
          slug="two-faces-of-young-businesses"
        />
      </div>
      <div className="prose prose-neutral dark:prose-invert">
        <p>
          Apart from entrepreneurship, I have also made some investments, these are some of them.
        </p>
      </div>

      <div className="my-8 flex h-fit flex-row space-x-2 overflow-x-auto w-auto">
        <div className="min-w-fit flex gap-4 items-center justify-between rounded border border-neutral-200 bg-neutral-50 px-3 py-1 dark:border-neutral-700 dark:bg-neutral-800">
          {/* MSFT */}
          <Image
            alt="Microsoft logo"
            src="/images/invest/microsoft.webp"
            width={50}
            height={50}
          />
          <div className="flex flex-col">
            <span>Microsoft</span>
            <span className="text-neutral-600 dark:text-neutral-300 text-xs">
              for $329
            </span>
            <span className={`text-xs ${prices['MSFT'] > 329 ? 'text-green-500' : 'text-red-500'}`}>
              {prices['MSFT'] > 329 ? `+${((prices['MSFT'] - 329) / 329 * 100).toFixed(2)}%` : `-(${((329 - prices['MSFT']) / 329 * 100).toFixed(2)}%)`}
            </span>
          </div>
        </div>
        <div className="min-w-fit flex lg:w-auto gap-4 items-center justify-between rounded border border-neutral-200 bg-neutral-50 px-3 py-1 dark:border-neutral-700 dark:bg-neutral-800">
          {/* NVIDIA */}
          <Image
            alt="NVIDIA logo"
            src="/images/invest/nvidia.png"
            width={50}
            height={50}
          />
          <div className="flex flex-col">
            <span>NVIDIA</span>
            <span className="text-neutral-600 dark:text-neutral-300 text-xs">
              for $55
            </span>
            <span className={`text-xs ${prices['NVDA'] > 55 ? 'text-green-500' : 'text-red-500'}`}>
              {prices['NVDA'] > 55 ? `+${((prices['NVDA'] - 55) / 55 * 100).toFixed(2)}%` : `-(${((55 - prices['NVDA']) / 55 * 100).toFixed(2)}%)`}
            </span>
          </div>
        </div>
        <div className="min-w-fit flex lg:w-auto w-48 gap-4 items-center justify-between rounded border border-neutral-200 bg-neutral-50 px-3 py-1 dark:border-neutral-700 dark:bg-neutral-800">
          {/* DECENTRALAND */}
          <Image
            alt="Decentraland logo"
            src="/images/invest/decentraland.png"
            width={40}
            height={40}
          />
          <div className="flex flex-col">
            <span>Decentraland</span>
            <span className="text-neutral-600 dark:text-neutral-300 text-xs">
              for $2,88
            </span>
          </div>
        </div>
        <div className="min-w-fit flex lg:w-auto w-48 gap-4 items-center justify-between rounded border border-neutral-200 bg-neutral-50 px-3 py-1 dark:border-neutral-700 dark:bg-neutral-800">
          <Image
            alt="Avalanche logo"
            src="/images/invest/avalanche.png"
            width={40}
            height={40}
          />
          <div className="flex flex-col">
            <span>AVALANCHE</span>
            <span className="text-neutral-600 dark:text-neutral-300 text-xs">
              for $9,21
            </span>
          </div>
        </div>

      </div>
      <div className="prose prose-neutral dark:prose-invert">
        <p>
          I am currently open to new job offers or new businesses, for that, you can contact me through one of my social networks or email.
        </p>
      </div>
      <ul className="font-sm mt-8 flex flex-col space-x-0 space-y-2 text-neutral-600 md:flex-row md:space-x-4 md:space-y-0 dark:text-neutral-300">
        <li>
          <a
            className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            rel="noopener noreferrer"
            target="_blank"
            href="https://twitter.com/marcsnv"
          >
            <ArrowIcon />
            <p className="ml-2 h-7">follow me</p>
          </a>
        </li>
        <li>
          <a
            className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            rel="noopener noreferrer"
            target="_blank"
            href="mailto:hey@marcsnv.com"
          >
            <ArrowIcon />
            <p className="ml-2 h-7">contact me</p>
          </a>
        </li>
      </ul>
    </section>
  );
}
