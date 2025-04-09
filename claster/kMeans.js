export function kMeans(k, points, maxIter=100)
{
    let centers = makeCenters(k, points)
    let clusters = [];
    for (let i = 0; i < maxIter; i++)
    {
        clusters = clusterization(points, centers)

        const newCenters = recenration(clusters);
        if (!isChanged(centers, newCenters))
        {
            break;
        }
        centers = newCenters;
    }
    return {clusters, centers}
}

function makeCenters(k, points)
{

    const centers = [points[Math.floor(Math.random() * points.length)]];
  
    while (centers.length < k) 
    {
      const distances = points.map(p => {
      const minDist = Math.min(...centers.map(c => distance(p, c))); //расстояние от соответствующей точки до ближайшей центроиды
      return minDist ** 2;
      });
  
      let sumDistance = 0;
      for (let i = 0; i < distances.length; i++) 
      {
        sumDistance += distances[i];
      }

      let threshold = Math.random() * sumDistance;
  
      for (let i = 0; i < points.length; i++)
      {
        threshold -= distances[i];
        if (threshold <= 0) 
        {
          centers.push(points[i]);
          break;
        }
      }
    }
    return centers;
}
function distance(a, b)
{
    return ((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}
function clusterization(points, centers)
{
    return points.map(point => {
      const distances = centers.map(c => distance(point, c));
      const clusterInd = distances.indexOf(Math.min(...distances));
      return {...point, clusterInd, color: clusterColors[clusterInd]}
    })
}
function recenration(clusters)
{
  const groups = grouping(clusters, 'clusterInd')
  return Object.values(groups).map(group => {
    return {
      x: average(group.map(p => p.x)),
      y: average(group.map(p => p.y))
    }
  })
}
function isChanged(centers, newCenters, threshold = 0.001)
{
  for (let i = 0; i < centers.length; i++)
  {
    const dx = centers[i].x-newCenters[i].x;
    const dy = centers[i].y-newCenters[i].y;

    const dist = Math.sqrt(dx ** 2 + dy ** 2);
    if (dist > threshold)
    {
      return false;
    }
  }
  return true;
}
function grouping(array, key)
{
  const groups = {};
  array.forEach(group => {
    const groupKey = group[key];
    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }
    groups[groupKey].push(group);
  });
  return groups;
}
function average(arr) 
{
  let sum = 0;
  for (let i = 0; i < arr.length; i++) 
  {
    sum += arr[i];
  }
  return sum / arr.length;
}

const clusterColors = [
  '#4285f4',
  '#FF4500',
  '#008000',
  '#00FFFF',
  '#FF00FF',
  '#D4A5A5',
  '#F7CAC9',
  '#92A8D1',
  '#88B04B',
  '#FFD166' 
];
