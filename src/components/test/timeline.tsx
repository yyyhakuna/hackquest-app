import * as TimelinePrimitive from '@hackquest/ui/shared/timeline'

export function TestTimeline() {
  return (
    <div>
      <TimelinePrimitive.Root>
        <TimelinePrimitive.Item>
          <TimelinePrimitive.Separator>
            <TimelinePrimitive.Dot />
            <TimelinePrimitive.Connector />
          </TimelinePrimitive.Separator>
          <TimelinePrimitive.Content>
            <h3>Registration Open</h3>
            <p>Feb 13, 2024 8:00pm(GMT+8)</p>
            {/* <p>Feb 13, 2024 8:00pm(GMT+8)</p>
            <p>Feb 13, 2024 8:00pm(GMT+8)</p>
            <p>Feb 13, 2024 8:00pm(GMT+8)</p>
            <p>Feb 13, 2024 8:00pm(GMT+8)</p>
            <p>Feb 13, 2024 8:00pm(GMT+8)</p>
            <p>Feb 13, 2024 8:00pm(GMT+8)</p>
            <p>Feb 13, 2024 8:00pm(GMT+8)</p> */}
          </TimelinePrimitive.Content>
        </TimelinePrimitive.Item>
        <TimelinePrimitive.Item>
          <TimelinePrimitive.Separator>
            <TimelinePrimitive.Dot />
          </TimelinePrimitive.Separator>
          <TimelinePrimitive.Content>
            <h3>Registration Open</h3>
            <p>Feb 13, 2024 8:00pm(GMT+8)</p>
          </TimelinePrimitive.Content>
        </TimelinePrimitive.Item>
      </TimelinePrimitive.Root>
    </div>
  )
}

/**
 * <Timeline active={-1}>
        <TimelineItem>
          <TimelineContent>
            <TimelineTitle>Registration Open</TimelineTitle>
            <TimelineDescription>
              Feb 13, 2024 8:00pm(GMT+8)
            </TimelineDescription>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineContent>
            <TimelineTitle>Submissions Close</TimelineTitle>
            <TimelineDescription>
              Feb 13, 2024 8:00pm(GMT+8)
            </TimelineDescription>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineContent>
            <TimelineTitle>Reward Announcement</TimelineTitle>
            <TimelineDescription>
              Feb 13, 2024 8:00pm(GMT+8)
            </TimelineDescription>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
      <Timeline active={2} orientation="horizontal">
        <TimelineItem>
          <TimelineContent>
            <TimelineTitle>Registration Open</TimelineTitle>
            <TimelineDescription>
              Feb 13, 2024 8:00pm(GMT+8)
            </TimelineDescription>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineContent>
            <TimelineTitle>Submissions Close</TimelineTitle>
            <TimelineDescription>
              Feb 13, 2024 8:00pm(GMT+8)
            </TimelineDescription>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineContent>
            <TimelineTitle>Reward Announcement</TimelineTitle>
            <TimelineDescription>
              Feb 13, 2024 8:00pm(GMT+8)
            </TimelineDescription>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
 */
