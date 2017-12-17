class Reservation < ApplicationRecord
  belongs_to :user
  belongs_to :announcement

  validates :start_date, :end_date, presence: true

  validates :start_date, :end_date, overlap: { scope: 'announcement_id', message_content: 'There is already a reservation for this period' }

  validates :start_date, date: true
  validates :end_date, date: true

  validate :min_reservation
  validate :max_reservation
  validate :past_reservation_start_date
  validate :past_reservation_end_date

  validates :end_date, date: { after_or_equal_to: Proc.new { :start_date }, message: "Vous avez la tête à l'envers (inversez les dates)" }, on: :create


  def min_reservation
    if (end_date - start_date).to_i > announcement.max_reservation
      errors.add(:end_date, "Vous devez réserver moins de #{announcement.max_reservation} jours")
    end
  end

 def max_reservation
   if (end_date - start_date).to_i < announcement.min_reservation
     errors.add(:end_date, "Vous devez au moins réserver pour #{announcement.min_reservation} jours")
   end
 end

  def past_reservation_start_date
    if start_date < Date.today
      errors.add(:start_date, "Mais non Marty ! On ne peux pas réserver dans le passé !")
    end
  end

  def past_reservation_end_date
    if end_date < Date.today
      errors.add(:end_date, "Mais non Marty ! On ne peux pas réserver dans le passé !")
    end
  end
end
