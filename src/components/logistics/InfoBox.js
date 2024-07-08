const InfoBox = () => {
  return (
    <div className='graph-item info-container'>
      <div className='title'>Info</div>
      <div className='text-container'>
        <div>
          This dashboard resembles some key KPIs that are often used at my current job.
          The data in completely fabricated and the hardest part of this dashboard was
          making the data. The process can be seen here:{' '}
          <a
            href='https://github.com/jmetzg11alpine/familytree_backend/blob/main/src/initialize_database/logistics.py'
            target='_blank'
            rel='noreferrer'
          >
            python script
          </a>
          .{' '}
        </div>
        <div>I hope my next job will also have fun data to work with.</div>
      </div>
    </div>
  );
};
export default InfoBox;
