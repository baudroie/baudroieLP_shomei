import React, { useEffect, useId, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { lineUrls, roleNames, type Role } from "./config";
import "./styles.css";
import "./responsive-fixes.css";
import "./master-curves.css";


const baseUrl = import.meta.env.BASE_URL;
const asset = (name: string) => `${baseUrl}assets/${name}`;
function Photo({
  name,
  alt,
  className = "",
}: {
  name: string;
  alt: string;
  className?: string;
}) {
  return <img className={`photo ${className}`} src={asset(name)} alt={alt} />;
}
function Art({
  name,
  alt,
  className = "",
}: {
  name: string;
  alt: string;
  className?: string;
}) {
  return <img className={`art ${className}`} src={asset(name)} alt={alt} />;
}
function LineButton({
  role,
  compact = false,
}: {
  role: Role;
  compact?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const titleId = useId();
  const dialog = useRef<HTMLDialogElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (open) dialog.current?.showModal();
  }, [open]);
  const label = compact ? "LINEで相談" : `LINEで${roleNames[role]}の話を聞く`;
  return (
    <>
      {lineUrls[role] ? (
        <a
          className={compact ? "line-outline" : "button"}
          href={lineUrls[role]!}
        >
          {label}
          <span aria-hidden="true">↗</span>
        </a>
      ) : (
        <button
          ref={button}
          className={compact ? "line-outline" : "button"}
          onClick={() => setOpen(true)}
        >
          {label}
          <span aria-hidden="true">↗</span>
        </button>
      )}
      <dialog
        ref={dialog}
        aria-labelledby={titleId}
        onKeyDown={(event) => { if (event.key === "Tab") { event.preventDefault(); dialog.current?.querySelector<HTMLButtonElement>("button")?.focus(); } }}
        onClose={() => {
          setOpen(false);
          button.current?.focus();
        }}
        onClick={(e) => {
          if (e.target === dialog.current) dialog.current?.close();
        }}
      >
        <h2 id={titleId}>LINEリンクは設定待ちです</h2>
        <p>
          {roleNames[role]}の正式な相談先URLは、準備ができ次第ご案内します。
        </p>
        <button className="button" onClick={() => dialog.current?.close()}>
          閉じる
        </button>
      </dialog>
    </>
  );
}
function Header({ role }: { role?: Role }) {
  const links =
    role === "sales"
      ? [
          ["営業の仕事", "#sales-work"],
          ["働く魅力", "#sales-value"],
          ["仲間と環境", "#sales-team"],
        ]
      : role === "hr"
        ? [
            ["人事の仕事", "#hr-work"],
            ["仕事の魅力", "#hr-value"],
            ["チームで支える", "#hr-support"],
          ]
        : role === "engineer"
          ? [
              ["仕事と技術", "#engineer-work"],
              ["学びとキャリア", "#engineer-career"],
              ["仲間と環境", "#engineer-team"],
            ]
          : [
              ["事業・会社情報", "#business"],
              ["人を育てる", "#learning"],
              ["働く人", "#support"],
            ];
  return (
    <header className="header">
      <a className="logo" href={baseUrl} aria-label="ボードルア まとめページ">
        <img src={asset("baudroie_logo.svg")} alt="" />
      </a>
      <nav aria-label="メインナビゲーション">
        {links.map(([label, url]) => (
          <a key={url} href={url}>
            {label}
          </a>
        ))}
        {role ? (
          <LineButton role={role} compact />
        ) : (
          <a className="line-outline" href="#jobs">
            3つの仕事
          </a>
        )}
      </nav>
    </header>
  );
}
function Footer({ role }: { role?: Role }) {
  return (
    <footer className="footer">
      <a href={baseUrl} className="logo">
        <img src={asset("baudroie_logo.svg")} alt="baudroie inc." />
      </a>
      <a href="https://www.baudroie.jp/" target="_blank" rel="noreferrer">
        {role ? "会社について" : "株式会社ボードルア"}
      </a>
      <a
        href="https://www.baudroie.jp/privacypolicy/"
        target="_blank"
        rel="noreferrer"
      >
        プライバシーポリシー
      </a>
      <small>
        {role === "hr" ? "人事職LP 構成案｜業務内容は想定を含みます｜" : ""}
        デザイン検討用{role ? "・写真はイメージです" : ""}
      </small>
    </footer>
  );
}
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="eyebrow">
      <i />
      {children}
    </div>
  );
}
function Overview() {
  return (
    <>
      <Header />
      <main className="overview">
        <section className="overview-hero" aria-labelledby="overview-title">
          <div className="hero-copy">
            <Eyebrow>ボードルアで働くということ。</Eyebrow>
            <h1 id="overview-title">
              人を<em>育てる</em>
              <br />
              その力で、
              <br />
              社会を支える
            </h1>
            <p>
              ボードルアは、ネットワークやクラウドなど、
              <br className="desktop" />
              社会の基盤となるITインフラを支える会社です。
            </p>
            <a className="button" href="#jobs">
              3つの仕事を知る <span aria-hidden="true">↓</span>
            </a>
          </div>
          <figure className="welcome">
            <Photo
              name="support-conversation-approved.webp"
              alt="オフィスで相談する4人のチームのイメージ（AI生成）"
            />
            
          </figure>
        </section>
        <section className="business section-pad" id="business">
          <div className="section-label">
            <div>
              <small>BUSINESS & COMPANY</small>
              <h2>事業・会社情報</h2>
            </div>
            <hr />
          </div>
          <h3>
            ITインフラの専門性で、
            <br />
            企業活動を支える。
          </h3>
          <p>
            ボードルアは、ITインフラストラクチャに特化した事業を展開しています。
            <br />
            ネットワーク、サーバー、セキュリティ、クラウドの各領域で、
            <br />
            技術と人材育成を基盤としたサービスを提供しています。
          </p>
          <h4>提供範囲</h4>
          <div className="service-flow">
            <strong>コンサルティング</strong>
            <span aria-hidden="true">→</span>
            <strong>設計・構築</strong>
            <span aria-hidden="true">→</span>
            <strong>マネージドサービス</strong>
          </div>
          <h4>主なサービス領域</h4>
          <div className="service-grid">
            {[
              [
                "network",
                "ネットワーク仮想化",
                "変化に柔軟に対応する",
                "ネットワークを構築",
              ],
              [
                "cloud",
                "クラウドソリューション",
                "クラウドへの移行計画から",
                "導入までを支援",
              ],
              [
                "security",
                "ITセキュリティ",
                "各種セキュリティ技術の",
                "導入・運用を支援",
              ],
              [
                "wireless",
                "ワイヤレス",
                "無線接続の導入を通じて",
                "ICT活用を支援",
              ],
            ].map(([key, title, a, b]) => (
              <div key={key}>
                <span className={`service-symbol ${key}`} aria-hidden="true">
                  <img src={asset(`icon-${key}.png`)} alt="" />
                </span>
                <h5>{title}</h5>
                <p>
                  {a}
                  <br />
                  {b}
                </p>
              </div>
            ))}
          </div>
          <dl className="company-facts">
            <div>
              <dt>設立</dt>
              <dd>2007年4月</dd>
            </div>
            <div>
              <dt>本社</dt>
              <dd>東京都港区・麻布台ヒルズ</dd>
            </div>
            <div>
              <dt>事業</dt>
              <dd>ITインフラストラクチャ</dd>
            </div>
          </dl>
          <div className="growth">
            <div>
              <h4>中長期の成長に向けた取り組み</h4>
              <p>
                ベインキャピタルの支援を活用し、M&Aや顧客基盤の拡充、
                <br />
                人材・組織の強化を通じて、中長期の成長を目指します。
              </p>
              <p className="source-pending">
                会社情報の最新状況は公式サイトをご確認ください。
              </p>
            </div>
            <ul>
              <li>事業基盤の拡大</li>
              <li>顧客基盤の拡充</li>
              <li>人材・組織の強化</li>
            </ul>
          </div>
        </section>
        <section className="learning cream" id="learning">
          <figure>
            <Photo
              name="college_training.jpg"
              alt="公式写真：先輩と学ぶボードルアカレッジの研修風景"
            />
            
          </figure>
          <div>
            <h2>
              学びを、
              <br />
              仕事に<em>活きる力</em>へ。
            </h2>
            <p>
              先輩から後輩へ、現場で培った知恵をつなぎ、
              <br />
              学びと実践を重ねていきます。
            </p>
            <div className="learning-points">
              <div>
                <span className="learning-icon" aria-hidden="true"><Art name="icon-mentor.png" alt="" /></span>
                先輩から学ぶ
              </div>
              <div>
                <span className="learning-icon" aria-hidden="true"><Art name="icon-laptop.png" alt="" /></span>
                実務につながる
                <br />
                教材
              </div>
              <div>
                <span className="learning-icon" aria-hidden="true"><Art name="icon-growth.png" alt="" /></span>
                段階的に力を
                <br />
                つける
              </div>
            </div>
          </div>
        </section>
        <section className="overview-support" id="support">
          <div>
            <h2>入社前も、その先も。</h2>
            <p>
              選考中の対話から、入社前の学習、配属後の相談まで。
              <br />
              人事・営業・先輩エンジニアが連携し、一人ひとりの挑戦を支えます。
            </p>
            <strong>人事 × 営業 × 先輩エンジニア</strong>
          </div>
          <figure>
            <Photo
              name="support-conversation-approved.webp"
              alt="入社前後の相談を支えるチームのイメージ（AI生成）"
            />
            
          </figure>
        </section>
        <section className="jobs" id="jobs">
          <h2>同じ未来を、違う役割で。</h2>
          <p>あなたの関心に近い仕事から、ボードルアを知ってください。</p>
          <div className="job-grid">
            {(["sales", "hr", "engineer"] as Role[]).map((role) => (
              <article key={role}>
                <div className="role-illustration">
                  <Art
                    className={`role-art role-${role}`}
                    name="overview-role-illustrations.png"
                    alt={roleNames[role] + "の仕事を表す線画"}
                  />
                </div>
                <h3>{role === "hr" ? "人事採用" : roleNames[role]}</h3>
                <p>
                  {role === "sales" ? (
                    <>
                      お客様の課題に、
                      <br />
                      チームで応える。
                    </>
                  ) : role === "hr" ? (
                    <>
                      人の可能性を、
                      <br />
                      会社の未来へ。
                    </>
                  ) : (
                    <>
                      技術を磨き、
                      <br />
                      社会の基盤を支える。
                    </>
                  )}
                </p>
                <a href={`${baseUrl}${role}/`} className="button">
                  {role === "hr" ? "人事採用" : roleNames[role]}の仕事を見る{" "}
                  <span aria-hidden="true">→</span>
                </a>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function Sales() {
  return (
    <>
      <Header role="sales" />
      <main className="sales">
        <section className="sales-hero">
          <div>
            <h1>
              大手企業の課題に、
              <br />
              <em>技術と人</em>で応える。
            </h1>
            <p>
              顧客開拓から、先端技術案件の獲得、
              <br />
              エンジニアのキャリア支援まで。
              <br />
              これまでの営業経験を、次のフィールドへ。
            </p>
            <LineButton role="sales" />
          </div>
          <Art
            name="sales-hero.png"
            alt="営業が仲間とITインフラの提案を話し合う線画"
          />
        </section>
        <section className="sales-work section-pad" id="sales-work">
          <div className="sales-intro">
            <div>
              <h2 className="serif">
                顧客を知る。仲間を知る。
                <br />
                そこから、提案が始まる。
              </h2>
              <p>ITインフラの専門性を、人と企業の可能性につなげる仕事です。</p>
            </div>
            <Photo
              name="office_lounge.jpg"
              alt="公式写真：オフィスで仲間と対話する様子"
            />
          </div>
          <div className="sales-map">
            <Art
              className="sales-map-art"
              name="sales-map.png"
              alt="顧客・先端技術案件・エンジニアのキャリアをつなぐ営業の関係図"
            />
            <article className="sales-client">
              <h3>顧客と、関係を育てる。</h3>
              <p>
                大手通信会社、SIer、事業会社など。
                <br />
                新規・既存の両面から顧客と対話し、
                <br />
                課題やニーズを捉えます。
              </p>
            </article>
            <article className="sales-project">
              <h3>先端技術の案件を、ひらく。</h3>
              <p>
                顧客のニーズを捉え、クラウドや仮想化
                <br />
                などのITインフラ案件の獲得につなげます。
              </p>
            </article>
            <article className="sales-career">
              <h3>エンジニアの、これからを支える。</h3>
              <p>
                経験や目指す姿に向き合い、
                <br />
                キャリアの可能性を広げていきます。
              </p>
            </article>
          </div>
        </section>
        <section className="sales-value charcoal" id="sales-value">
          <div>
            <h2 className="serif">
              大手を任される。
              <span>経営に近い距離で働く。</span>
            </h2>
            <i className="orange-rule" />
            <p>
              これまでの営業経験を活かし、
              <br />
              より大きなフィールドで挑戦できます。
            </p>
          </div>
          <div className="value-notes">
            <article>
              <h3 className="serif">
                1年目から、
                <br />
                大手企業の担当へ。
              </h3>
              <p>
                大手通信会社やSIerなどの顧客を担当。
                <br />
                裁量を持って関係構築に取り組めます。
              </p>
            </article>
            <article>
              <h3 className="serif">将来の役割も、広げていく。</h3>
              <p>
                経営者と近い立場で仕事に取り組み。
                <br />
                将来は管理職として抜擢されるチャンスもあります。
              </p>
            </article>
          </div>
        </section>
        <section className="sales-team" id="sales-team">
          <Photo
            name="office_lounge.jpg"
            alt="公式写真：仲間と考えるオフィスのラウンジ"
          />
          <div className="team-caption cream">
            <Eyebrow>仲間と環境</Eyebrow>
            <h2>一緒に考える人がいる。</h2>
            <p>
              顧客への提案も、エンジニアのキャリア支援も。
              <br />
              仲間と対話を重ねながら、仕事を進めていきます。
            </p>
            <strong>営業 × エンジニア</strong>
          </div>
        </section>
        <section className="sales-training section-pad">
          <div>
            <Eyebrow>成長のサポート</Eyebrow>
            <h2>
              営業経験に、
              <br />
              ITインフラの知識を。
            </h2>
            <p>
              業界研究や各種研修を通じて、新しい領域への理解を深める。
              <br />
              上司とは別に相談できるメンターも、入社後を支えます。
            </p>
          </div>
          <div className="training-trio">
            <div>
              <Art name="sales-research.png" alt="" />
              業界研究・各種研修
            </div>
            <div>
              <Art name="icon-sales-cloud.png" alt="" />
              研修費全額補助
            </div>
            <div>
              <Art name="hr-hero.png" alt="" />
              メンター制度
            </div>
          </div>
        </section>
        <section className="sales-cta cream section-pad">
          <div>
            <h2>まずは、仕事の話から。</h2>
            <p>
              ボードルアの営業について、
              <br />
              LINEからお気軽にご相談ください。
            </p>
            <LineButton role="sales" />
          </div>
          <Art
            name="sales-phone.png"
            alt="営業がスマートフォンで相談する線画"
          />
        </section>
      </main>
      <Footer role="sales" />
    </>
  );
}

function HR() {
  return (
    <>
      <Header role="hr" />
      <main className="hr">
        <section className="hr-hero cream">
          <Photo
            name="recruiting_conversation.jpg"
            alt="公式写真：採用について対話する様子"
          />
          <div className="hr-hero-copy">
            <Eyebrow>HUMAN RESOURCES / 人事・採用</Eyebrow>
            <h1>
              人の<em>可能性</em>を、
              <br />
              会社の未来へ。
            </h1>
            <p>
              一人ひとりとの対話から、採用の企画、入社前後のフォローまで。
              <br />
              人と組織の成長に関わる仕事です。
            </p>
            <LineButton role="hr" />
          </div>
          <Art name="hr-hero.png" alt="人事が一人ひとりと対話する線画" />
        </section>
        <section className="hr-work section-pad" id="hr-work">
          <h2 className="serif">対話から、その人を知る。</h2>
          <p className="hr-lead">
            これまでの経験も、これからの想いも。
            <br />
            一人ひとりの言葉に耳を傾けます。
          </p>
          <div className="hr-meeting">
            <Art
              name="hr-hero.png"
              alt="向かい合って話を聞く人事担当者と候補者の線画"
            />
            <article>
              <h3>出会いを、次の一歩につなげる。</h3>
              <p>
                候補者の関心や不安を受け止め、
                <br />
                仕事内容や会社のことを伝えながら、
                <br />
                相互理解を深めます。
              </p>
            </article>
          </div>
          <div className="hr-planning cream">
            <article>
              <h3>採用の機会を、つくる。</h3>
              <p>
                会社の魅力の伝え方や、候補者との接点を考える。
                <br />
                日々の採用活動をチームで振り返り、
                <br />
                よりよい出会いにつなげます。
              </p>
            </article>
            <Art
              name="hr-planning.png"
              alt="ホワイトボードを使いチームで採用企画を検討する線画"
            />
          </div>
        </section>
        <section className="hr-support cream section-pad" id="hr-support">
          <h2 className="serif">入社前も、その先も。</h2>
          <p>
            入社前の不安や学び、入社後の相談まで。
            <br />
            人事・営業・先輩エンジニアが連携し、一人ひとりの挑戦を支えます。
          </p>
          <figure>
            <Photo
              name="support-conversation-approved.webp"
              alt="人事・営業・先輩が相談するイメージ（AI生成）"
            />
            <figcaption>人事 × 営業 × 先輩エンジニア</figcaption>
          </figure>
          <div className="support-pair">
            <article>
              <h3>入社前のつながりをつくる</h3>
              <p>
                先輩エンジニアとの橋渡しや、
                <br />
                安心して相談できる関係づくり。
              </p>
            </article>
            <article>
              <h3>入社後も、対話を重ねる</h3>
              <p>
                働き始めてからの声にも耳を傾け、
                <br />
                必要な支援につなげます。
              </p>
            </article>
          </div>
        </section>
        <section className="hr-value section-pad" id="hr-value">
          <div>
            <h2 className="serif">
              人の成長が、
              <br />
              会社の成長につながる。
            </h2>
            <i className="orange-rule" />
            <p>
              一人の挑戦を支えることが、
              <br />
              組織の可能性を広げていく。
              <br />
              人と会社、その両方に向き合う仕事です。
            </p>
          </div>
          <div className="charcoal">
            <article>
              <h3 className="serif">人の変化に、立ち会える。</h3>
              <p>
                対話を重ねた相手が、新しい一歩を踏み出す。
                <br />
                その過程に関われることが、人事の仕事の魅力です。
              </p>
            </article>
            <article>
              <h3 className="serif">組織をつくる視点が、育つ。</h3>
              <p>
                現場の声と候補者の想いをつなぎ、
                <br />
                どんな出会いや支援が必要かを考えていきます。
              </p>
            </article>
          </div>
        </section>
        <section className="hr-team cream">
          <Art name="hr-team.png" alt="人事・営業・先輩が一緒に話す線画" />
          <div>
            <h2 className="serif">一人で抱えず、チームで考える。</h2>
            <p>
              候補者との対話も、採用活動の工夫も。
              <br />
              社内の仲間と情報を共有し、相談しながら進めていきます。
            </p>
          </div>
        </section>
        <section className="hr-cta cream">
          <Art name="hr-notebook.png" alt="" />
          <h2>まずは、仕事の話から。</h2>
          <p>
            ボードルアの人事・採用について、
            <br />
            LINEからお気軽にご相談ください。
          </p>
          <LineButton role="hr" />
        </section>
      </main>
      <Footer role="hr" />
    </>
  );
}

function Engineer() {
  return (
    <>
      <Header role="engineer" />
      <main className="engineer">
        <section className="engineer-hero">
          <div className="engineer-hero-top">
            <div>
              <small>ENGINEER / エンジニア</small>
              <h1>
                技術を磨く。
                <br />
                <em>可能性</em>を広げる。
              </h1>
              <p>
                これからITを学ぶ人も、経験を次につなげたい人も。
                <br />
                社会を支えるITインフラの世界で、自分の可能性を広げていく。
              </p>
              <LineButton role="engineer" />
            </div>
            <figure>
              <Photo
                name="engineer-network.png"
                alt="ネットワーク機器にケーブルを接続する手元のイメージ（AI生成）"
              />
              
            </figure>
          </div>
          <Art
            name="engineer-panorama.png"
            alt="エンジニアがサーバーやクラウドをつなぎ学ぶ線画"
          />
          <nav className="engineer-jump" aria-label="経験に合わせたご案内">
            <a href="#beginner">
              初めてITを学ぶ方へ <span aria-hidden="true">↓</span>
            </a>
            <a href="#experienced">
              経験を次につなげたい方へ <span aria-hidden="true">↓</span>
            </a>
          </nav>
        </section>
        <section className="engineer-work section-pad" id="engineer-work">
          <h2 className="serif">社会の「あたりまえ」を、技術で支える。</h2>
          <p>
            ネットワーク、サーバー、クラウド、セキュリティ。
            <br />
            サービスがつながり、使い続けられる。その土台をつくるのが、ITインフラの仕事です。
          </p>
          <div className="infrastructure">
            <div className="infrastructure-labels">
              {[
                [
                  "ネットワーク・サーバー",
                  "つながる仕組みを設計し、",
                  "安定した運用を支えます。",
                ],
                ["クラウド", "柔軟で拡張性のある", "環境の導入を支援します。"],
                [
                  "セキュリティ",
                  "安心して使い続けられる",
                  "環境をつくります。",
                ],
                [
                  "ネットワーク仮想化",
                  "多様なサービスに対応できる",
                  "基盤を構築します。",
                ],
              ].map(([title, a, b]) => (
                <article key={title}>
                  <h3>{title}</h3>
                  <p>
                    {a}
                    <br />
                    {b}
                  </p>
                </article>
              ))}
            </div>
            <Art
              name="engineer-infrastructure.png"
              alt="街の暮らしをネットワーク・サーバー・クラウドで支える線画"
            />
          </div>
          <div className="infrastructure-caption">
            <strong>コンサルティングから、設計・構築、運用まで。</strong>
            <p>専門技術を活かし、ITインフラの幅広い領域を支えています。</p>
          </div>
        </section>
        <section className="engineer-paths cream" id="engineer-career">
          <h2 className="serif">今の自分から、次のステージへ。</h2>
          <div className="path-grid">
            <article id="beginner">
              <Eyebrow>初めてITを学ぶ方へ</Eyebrow>
              <h3>
                基礎を学び、
                <br />
                実践する力へ。
              </h3>
              <p>
                ネットワークの基礎や資格の学習から。
                <br />
                実機を使った演習へ。先輩と学びながら、
                <br />
                仕事につながる理解を深めていきます。
              </p>
              <div className="path-illustration">
              <Art
                name="engineer-beginner-transparent.png"
                alt="先輩とネットワーク機器の演習をする線画"
              />
              </div>
              <div className="path-skills">
                <span>基礎学習</span>
                <span>資格取得支援</span>
                <span>実機演習</span>
              </div>
            </article>
            <article id="experienced" className="charcoal">
              <Eyebrow>経験を次につなげたい方へ</Eyebrow>
              <h3>
                専門性を深め、
                <br />
                挑戦の幅を広げる。
              </h3>
              <p>
                クラウドやセキュリティ、ネットワーク仮想化など。
                <br />
                これまでの経験を、どんな技術や役割につなげたいか。
                <br />
                次のキャリアを一緒に考えてみませんか。
              </p>
              <div className="path-illustration">
              <Art
                name="engineer-experienced.png"
                alt="クラウドや設計・構築の専門性を深める線画"
              />
              </div>
              <div className="path-skills">
                <span>先端技術</span>
                <span>設計・構築</span>
                <span>専門性の深化</span>
              </div>
            </article>
          </div>
        </section>
        <section className="engineer-learning section-pad">
          <div>
            <h2>
              学びを、
              <br />
              現場で<em>活きる力</em>に。
            </h2>
            <p>
              資格取得を支える学習機会や、実機環境を使う技術カレッジ。
              <br />
              知識を学ぶだけでなく、実践に結びつけていきます。
            </p>
            <small className="qualification">資格学習の例：CCNA・CCNP</small>
          </div>
          <figure>
            <Photo
              name="engineer-training.png"
              alt="ネットワーク機器を使って学ぶエンジニアのイメージ（AI生成）"
            />
            <figcaption>
              実機に触れる。先輩と考える。理解を深める。

            </figcaption>
          </figure>
        </section>
        <section className="engineer-career section-pad">
          <div>
            <h2 className="serif">深める道も、広げる道も。</h2>
            <p>
              技術を追求する。プロジェクトを動かす。顧客の課題に向き合う。
              <br />
              経験を重ねながら、自分の志向に合うキャリアを考えていきます。
            </p>
          </div>
          <div>
            <small>キャリアの例</small>
            <ul>
              <li>スペシャリスト</li>
              <li>
                プロジェクト
                <br />
                マネージャー
              </li>
              <li>ITコンサルタント</li>
            </ul>
          </div>
        </section>
        <section className="engineer-team cream section-pad" id="engineer-team">
          <div>
            <h2 className="serif">入社前も、その先も。</h2>
            <p>
              人事・営業・先輩エンジニアが連携し、
              <br />
              学びや仕事、これからのキャリアを支えます。
            </p>
          </div>
          <Art
            name="hr-team.png"
            alt="人事・営業・先輩エンジニアの支援を表す線画"
          />
          <ul>
            <li>
              技術のことを、
              <br />
              先輩に相談する。
            </li>
            <li>
              仕事やキャリアを、
              <br />
              一緒に考える。
            </li>
          </ul>
        </section>
        <section className="engineer-cta section-pad">
          <Art name="engineer-laptop.png" alt="" />
          <div>
            <h2>
              あなたの「<em>これから</em>」を、
              <br />
              聞かせてください。
            </h2>
            <p>
              未経験からの一歩も、経験を活かした次の挑戦も。
              <br />
              まずはLINEで、仕事の話から。
            </p>
          </div>
          <LineButton role="engineer" />
        </section>
      </main>
      <Footer role="engineer" />
    </>
  );
}

const relativePath = window.location.pathname.startsWith(baseUrl)
  ? window.location.pathname.slice(baseUrl.length)
  : window.location.pathname;
const path = "/" + relativePath.replace(/^\/+|\/+$/g, "");
const Page =
  path === "/sales"
    ? Sales
    : path === "/hr"
      ? HR
      : path === "/engineer"
        ? Engineer
        : path === "/"
          ? Overview
          : null;
document.title = `${path === "/sales" ? "営業" : path === "/hr" ? "人事・採用" : path === "/engineer" ? "エンジニア" : "ボードルアで働くということ。"} | baudroie inc.`;
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <a className="skip-link" href="#content">
      本文へ
    </a>
    <div id="content" tabIndex={-1}>
      {Page ? (
        <Page />
      ) : (
        <>
          <Header />
          <main className="not-found">
            <h1>ページが見つかりません</h1>
            <a className="button" href={baseUrl}>
              まとめページへ戻る
            </a>
          </main>
          <Footer />
        </>
      )}
    </div>
  </React.StrictMode>,
);

